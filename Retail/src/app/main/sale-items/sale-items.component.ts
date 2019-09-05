import { Component, OnInit } from "@angular/core";
import { Sale, SaleDetail, SaleItem } from "src/app/models/sale.model";

@Component({
  selector: "app-sale-items",
  templateUrl: "./sale-items.component.html",
  styleUrls: ["./sale-items.component.sass"]
})
export class SaleItemsComponent implements OnInit {
  sales: Sale;
  itemDisplayName: string;
  productCode: string;
  subTotal: number;
  totalDiscount: number;
  total: number;

  constructor() {
    this.loadSales();
  }

  ngOnInit() {}

  onProductEnter(event: KeyboardEvent) {
    const value = (<HTMLInputElement>event.target).value;
    const newItem = new SaleDetail(
      new SaleItem(
        this.sales.items.length + 1,
        value,
        Math.floor(Math.random() * 100) + 10,
        1234567890 + this.sales.items.length + 1
      ),
      1,
      0
    );
    this.sales.items.push(newItem);
    this.productCode = "";

    this.updateTotalAmounts();
  }

  onAddItem(id): void {
    const { items } = this.sales;
    let item = items.find(it => it.itemDetail.id == id);
    item.quantity += 1;

    this.updateTotalAmounts();
  }

  onRemoveItem(id: number): void {
    const { items } = this.sales;
    let item = items.find(it => it.itemDetail.id == id);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const index = items.indexOf(item);
      items.splice(index, 1);
    }

    this.updateTotalAmounts();
  }

  private updateTotalAmounts(): void {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const totalAmount = this.sales.items
      .map(it => it.totalAmount)
      .reduce(reducer, 0);
    this.subTotal = Math.round(totalAmount * 100) / 100;

    const discountAmount = this.sales.items
      .map(it => it.discountAmount)
      .reduce(reducer, 0);
    this.totalDiscount = Math.round(discountAmount * 100) / 100;

    this.total = Math.round((this.subTotal - this.totalDiscount) * 100) / 100;
  }

  private loadSales(): void {
    // TODO: Mock data. Will be moved to some service.
    this.sales = new Sale(1, new Date());
    const items: SaleDetail[] = [];
    this.sales.items = items;

    const item1 = new SaleDetail(
      new SaleItem(1, "New Balance sneakers", 100, 1234567890),
      1,
      10
    );
    items.push(item1);
    let item2 = new SaleDetail(
      new SaleItem(2, "Canon EOS 650D", 305, 2234567890),
      1,
      5
    );
    items.push(item2);
    let item3 = new SaleDetail(
      new SaleItem(3, "Parrot Anafi Drone", 549, 3234567890),
      1,
      15
    );
    items.push(item3);
    let item4 = new SaleDetail(
      new SaleItem(4, "Sony Home Theatre System", 399.95, 4234567890),
      1,
      20
    );
    items.push(item4);
    let item5 = new SaleDetail(
      new SaleItem(
        5,
        "MacBook Pro 15-inch 8-core 5.0GHz 32GB 3.2GB/s SSD Storage Touch Bar Touch ID",
        2153,
        5234567890
      ),
      1,
      25
    );
    items.push(item5);
    let item6 = new SaleDetail(
      new SaleItem(6, "iPhone Xs", 729, 6234567890),
      1,
      0
    );
    items.push(item6);

    this.updateTotalAmounts();
  }
}
