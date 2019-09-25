import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { Sale, SaleDetail, Item } from "src/app/models/sale.model";
import { Message } from "src/app/models/message.model";
import { Status } from "src/app/models/state.model";
import { ItemService } from "src/app/services/item.service";
import { SaleService } from "src/app/services/sale.service";
import { RestService } from "src/app/services/rest.service";
import { CommunicationService } from "src/app/services/communication.service";

@Component({
  selector: "app-sale-items",
  templateUrl: "./sale-items.component.html",
  styleUrls: ["./sale-items.component.sass"]
})
export class SaleItemsComponent implements OnInit, OnDestroy {
  sale: Sale;
  itemDisplayName: string;
  itemCode: string;
  subTotal: number;
  totalDiscount: number;
  total: number;
  private subscription: Subscription;

  @ViewChild("itemBarcode", { static: false }) itemBarcode: ElementRef;

  constructor(
    private saleService: SaleService,
    private itemService: ItemService,
    private rest: RestService,
    private communicationService: CommunicationService
  ) {
    this.subscription = this.communicationService.saleStatusChanged.subscribe(
      msg => {
        if (msg) {
          switch (msg.status) {
            case Status.isCompleted:
              this.completeSale();
              break;
            case Status.isSaved:
              this.saveSale();
              break;
            case Status.isRemoved:
              this.clearSale();
              break;
          }
        }
      }
    );
    this.communicationService.saleChanged.subscribe(msg => {
      if (msg.status == Status.isRestored) {
        if (this.sale.saleDetails.length > 0) {
          alert("Current sale is not empty.");
          return;
        } else {
          this.saveSale();
          this.sale = this.saleService.moveSavedSaleToCurrent(msg.saleId);
          this.updateTotalAmounts();
          this.communicationService.sendSaleInfo(
            new Message(null, this.sale.id)
          );
        }
      }
    });

    this.sale = new Sale(1);
    this.sale.saleDetails = [];
  }

  ngOnInit() {
    const key: string = "sale";
    let saleJson: string = sessionStorage.getItem(key);
    if (!saleJson) {
      this.sale = this.saleService.getSale();
      saleJson = JSON.stringify(this.sale);
      sessionStorage.clear();
      sessionStorage.setItem(key, saleJson);
    } else this.sale = JSON.parse(saleJson);

    this.updateTotalAmounts();

    this.communicationService.sendSaleInfo(new Message(null, this.sale.id));
  }

  onItemEnter(event: HTMLInputElement) {
    // Can use {this.itemCode} as well as {this.itemBarcode.nativeElement.value}
    if (!event.value) return;

    const barcode = parseInt(event.value);
    let item = this.itemService.getItemByBarcode(barcode);

    if (!item) {
      const itemCount = this.itemService.getItems().length;
      item = this.itemService.createNewItem(itemCount);
    }

    const newSaleDetail = new SaleDetail(item.id, item.price, 1, 0);
    this.sale.saleDetails.push(newSaleDetail);

    this.itemCode = "";
    this.updateTotalAmounts();

    let message = new Message(null, null, item);
    this.communicationService.sendItem(message);
  }

  onAmountChanged(isRemoved: boolean, saleDetail: SaleDetail) {
    if (isRemoved) {
      const { saleDetails } = this.sale;
      const index = saleDetails.indexOf(saleDetail);
      saleDetails.splice(index, 1);
      this.communicationService.clearItem();
    }

    this.updateTotalAmounts();
  }

  private saveSale(): void {
    if (this.sale.saleDetails.length > 0) {
      this.sale = this.saleService.saveSale(this.sale);
      this.communicationService.clearItem();
      this.communicationService.sendSaleInfo(new Message(null, this.sale.id));
      this.updateTotalAmounts();
    } else {
      // TODO: show error message or something else
    }
  }

  private completeSale(): void {
    if (this.sale.saleDetails.length > 0) {
      this.rest
        .postSale(this.sale)
        .subscribe(
          (response: Response) => console.log(response),
          (error: Response) => console.log(error)
        );

      this.sale = this.saleService.completeSale(this.sale);

      this.communicationService.clearItem();
      this.communicationService.sendSaleInfo(new Message(null, this.sale.id));

      this.updateTotalAmounts();
    } else {
      // TODO: show error message or something else
    }
  }

  private clearSale(): void {
    this.sale.saleDetails = [];
    this.communicationService.clearItem();
    this.updateTotalAmounts();
  }

  private updateTotalAmounts(): void {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const roundTo2 = value => Math.round(value * 100) / 100;

    this.subTotal = roundTo2(
      this.sale.saleDetails.map(s => s.price).reduce(reducer, 0)
    );
    this.totalDiscount = roundTo2(
      this.sale.saleDetails.map(s => s.discountAmount).reduce(reducer, 0)
    );
    this.total = roundTo2(this.sale.totalAmount);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
