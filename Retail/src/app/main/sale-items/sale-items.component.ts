import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Sale, SaleDetail, Item } from "src/app/models/sale.model";
import { Message } from "src/app/models/message.model";
import { Status } from "src/app/models/status.model";
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
  private subscription: Subscription;

  constructor(
    private saleService: SaleService,
    private itemService: ItemService,
    private communicationService: CommunicationService
  ) {
    this.subscription = this.communicationService
      .getSaleStatus()
      .subscribe(msg => {
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
      });
    this.communicationService.getSale().subscribe(msg => {
      if (msg) {
        if (this.sale.saleDetails.length > 0) {
          alert("Current sale is not empty.");
          return;
        } else {
          this.saveSale();
          this.sale = this.saleService.removeSavedSaleById(msg.billNumber);
          this.updateTotalAmounts();
          this.communicationService.sendSaleInfo(
            new Message(null, this.sale.id)
          );
        }
      }
    });
  }

  ngOnInit() {
    this.loadSales();

    this.communicationService.sendSaleInfo(new Message(null, this.sale.id));
  }

  onItemEnter(event: KeyboardEvent) {
    const value = (<HTMLInputElement>event.target).value;

    if (!value) return;

    const itemCount = this.itemService.getItems().length;
    const newItem = new Item(
      itemCount + 1,
      value,
      this.getRandomIntInclusive(10, 100),
      1234567890 + itemCount + 1,
      `./assets/new_product${this.getRandomIntInclusive(1, 2)}.jpg`
    );
    this.itemService.addItem(newItem);
    const newSaleDetail = new SaleDetail(newItem.id, newItem.price, 1, 0);
    this.sale.saleDetails.push(newSaleDetail);

    this.itemCode = "";
    this.updateTotalAmounts();

    let message = new Message(null, null, newItem.name, newItem.imageUrl);
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

  private loadSales(): void {
    this.sale = this.saleService.getMockSale();
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

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
