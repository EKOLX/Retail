import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { Sale, SaleDetail } from "src/app/models/sale.model";
import { Message } from "src/app/models/message.model";
import { Status } from "src/app/models/state.model";
import { ItemService } from "src/app/services/item.service";
import { SaleService } from "src/app/services/sale.service";
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

  private saleStatusChangedSub: Subscription;
  private saleChangedSub: Subscription;
  private saleChangedServiceSub: Subscription;

  @ViewChild("itemBarcode", { static: false }) itemBarcode: ElementRef;

  constructor(
    private saleService: SaleService,
    private itemService: ItemService,
    private communicationService: CommunicationService
  ) {
    this.sale = new Sale(1);
    this.sale.saleDetails = [];

    this.saleStatusChangedSub = this.communicationService.saleStatusChanged.subscribe(
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
    this.saleChangedSub = this.communicationService.saleChanged.subscribe(
      msg => {
        if (msg.status == Status.isRestored) {
          if (this.sale.saleDetails.length > 0) {
            alert("Current sale is not empty.");
            return;
          } else {
            this.saveSale();
            this.saleService.moveSavedSaleToCurrent(msg.saleId);
            this.updateTotalAmounts();
            this.communicationService.sendSaleInfo(
              new Message(null, this.sale.id)
            );
          }
        }
      }
    );
    this.saleChangedServiceSub = this.saleService.saleChanged.subscribe(
      sale => {
        this.sale = sale;
        this.updateTotalAmounts();
      }
    );
  }

  ngOnInit() {
    this.sale = this.saleService.getSale();
    this.updateTotalAmounts();
    this.communicationService.sendSaleInfo(new Message(null, this.sale.id));
  }

  get cursorStyle(): string {
    return this.itemCode ? "pointer" : "not-allowed";
  }

  onItemEnter(event: HTMLInputElement) {
    // Can use {this.itemCode} as well as {this.itemBarcode.nativeElement.value}
    if (!event.value) return;

    const barcode = parseInt(event.value);
    let item = this.itemService.getItemByBarcode(barcode);

    if (!item) {
      alert(
        `Item with the barcode ${barcode} doesn't exist. You can find valid barcode (e.g. 1234567890) on the Nomenclature.`
      );
      return;
    }

    this.saleService.addItemToSale(item);

    this.itemCode = "";
    this.updateTotalAmounts();

    let message = new Message(null, null, item);
    this.communicationService.sendItem(message);
  }

  onAmountChanged(saleDetail: SaleDetail) {
    this.saleService.changeItemCountInSale(saleDetail);
    this.communicationService.clearItem();
    this.updateTotalAmounts();
  }

  private saveSale(): void {
    if (this.sale.saleDetails.length > 0) {
      this.saleService.saveSale(this.sale);
      this.communicationService.clearItem();
      this.communicationService.sendSaleInfo(new Message(null, this.sale.id));
      this.updateTotalAmounts();
    } else {
      // TODO: show error message or something else
    }
  }

  private completeSale(): void {
    if (this.sale.saleDetails.length > 0) {
      this.saleService.completeSale(this.sale);

      this.communicationService.clearItem();
      this.communicationService.sendSaleInfo(new Message(null, this.sale.id));

      this.updateTotalAmounts();
    }
  }

  private clearSale(): void {
    this.saleService.clearSaleItems();
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
    this.saleStatusChangedSub.unsubscribe();
    this.saleChangedSub.unsubscribe();
    this.saleChangedServiceSub.unsubscribe();
  }
}
