import { Component, OnInit, OnDestroy } from "@angular/core";
import { Sale, SaleDetail, Item } from "src/app/models/sale.model";
import { SaleService } from "src/app/services/sale.service";
import { CommunicationService } from "src/app/services/communication.service";
import { Message } from "src/app/models/message.model";
import { Status } from "src/app/models/status.model";
import { Subscription } from "rxjs";

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
        // TODO: Check current sale. If it's empty add selected sale otherwise show dialog about confirmation.
        if (this.sale.items.length > 0) {
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

    const newItem = new Item(
      this.sale.items.length + 1,
      value,
      this.getRandomIntInclusive(10, 100),
      1234567890 + this.sale.items.length + 1,
      `./assets/new_product${this.getRandomIntInclusive(1, 2)}.jpg`
    );
    this.sale.items.push(newItem);
    const newSaleDetail = new SaleDetail(newItem.id, newItem.price, 1, 0);
    this.sale.saleDetails.push(newSaleDetail);

    this.itemCode = "";
    this.updateTotalAmounts();

    let message = new Message(null, null, newItem.name, newItem.imageUrl);
    this.communicationService.sendItem(message);
  }

  onAmountChanged(event: boolean) {
    this.updateTotalAmounts();
  }

  private loadSales(): void {
    this.sale = this.saleService.getMockSale();
    this.updateTotalAmounts();
  }

  private saveSale(): void {
    if (this.sale.items.length > 0) {
      this.sale = this.saleService.saveSale(this.sale);
      this.communicationService.clearItem();
      this.communicationService.sendSaleInfo(new Message(null, this.sale.id));
      this.updateTotalAmounts();
    } else {
      // TODO: show error message or something else
    }
  }

  private completeSale(): void {
    if (this.sale.items.length > 0) {
      this.sale = this.saleService.completeSale(this.sale);
      this.communicationService.clearItem();
      this.communicationService.sendSaleInfo(new Message(null, this.sale.id));
      this.updateTotalAmounts();
    } else {
      // TODO: show error message or something else
    }
  }

  private clearSale(): void {
    this.sale.items = [];
    this.communicationService.clearItem();
    this.updateTotalAmounts();
  }

  private updateTotalAmounts(): void {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const roundTo2 = value => Math.round(value * 100) / 100;

    const totalAmount = this.sale.saleDetails
      .map(s => s.totalAmount)
      .reduce(reducer, 0);
    this.subTotal = roundTo2(totalAmount);

    const discountAmount = this.sale.saleDetails
      .map(s => s.discountAmount)
      .reduce(reducer, 0);
    this.totalDiscount = roundTo2(discountAmount);

    this.total = roundTo2(this.subTotal - this.totalDiscount);
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
