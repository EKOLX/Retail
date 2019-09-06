import { Component, OnInit } from "@angular/core";
import { Sale, SaleDetail, Item } from "src/app/models/sale.model";
import { SaleService } from "src/app/services/sale.service";
import { CommunicationService } from "src/app/services/communication.service";

@Component({
  selector: "app-sale-items",
  templateUrl: "./sale-items.component.html",
  styleUrls: ["./sale-items.component.sass"]
})
export class SaleItemsComponent implements OnInit {
  sale: Sale;
  itemDisplayName: string;
  itemCode: string;
  subTotal: number;
  totalDiscount: number;
  total: number;

  constructor(
    private saleService: SaleService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this.loadSales();
    this.communicationService.sendSale(this.sale);
  }

  onItemEnter(event: KeyboardEvent) {
    const value = (<HTMLInputElement>event.target).value;

    if (!value) return;

    const newSaleItem = new Item(
      this.sale.items.length + 1,
      value,
      this.getRandomIntInclusive(10, 100),
      1234567890 + this.sale.items.length + 1,
      `./assets/new_product${this.getRandomIntInclusive(1, 3)}.jpg`
    );
    const newItem = new SaleDetail(newSaleItem, 1, 0);

    this.sale.items.push(newItem);

    this.itemCode = "";

    this.updateTotalAmounts();
    this.communicationService.sendSaleItem(newSaleItem);
  }

  onItemSelect(id): void {
    const item = this.sale.items.find(it => it.itemDetail.id == id).itemDetail;
    this.communicationService.sendSaleItem(item);
  }

  onAddItem(id): void {
    const { items } = this.sale;
    let item = items.find(it => it.itemDetail.id == id);
    item.quantity += 1;

    this.updateTotalAmounts();
  }

  onRemoveItem(id: number): void {
    const { items } = this.sale;
    let item = items.find(it => it.itemDetail.id == id);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const index = items.indexOf(item);
      items.splice(index, 1);
      this.communicationService.clearSaleItem();
    }

    this.updateTotalAmounts();
  }

  private updateTotalAmounts(): void {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const roundTo2 = value => Math.round(value * 100) / 100;

    const totalAmount = this.sale.items
      .map(it => it.totalAmount)
      .reduce(reducer, 0);
    this.subTotal = roundTo2(totalAmount);

    const discountAmount = this.sale.items
      .map(it => it.discountAmount)
      .reduce(reducer, 0);
    this.totalDiscount = roundTo2(discountAmount);

    this.total = roundTo2(this.subTotal - this.totalDiscount);
  }

  private loadSales(): void {
    this.sale = this.saleService.getSale();
    this.updateTotalAmounts();
  }

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
