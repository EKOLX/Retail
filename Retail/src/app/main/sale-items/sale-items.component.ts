import { Component, OnInit } from "@angular/core";
import { Sale } from "src/app/models/Sales";
import { SaleItem } from "src/app/models/SaleItem";
import { SaleDetails } from "src/app/models/SaleDetails";

@Component({
  selector: "app-sale-items",
  templateUrl: "./sale-items.component.html",
  styleUrls: ["./sale-items.component.sass"]
})
export class SaleItemsComponent implements OnInit {
  sales: Sale;
  itemDisplayName: string;

  constructor() {
    this.loadSales();
  }

  ngOnInit() {}

  onAddItem(id): void {
    const { items } = this.sales;
    let item = items.find(it => it.itemDetails.id == id);
    item.quantity += 1;
  }

  onRemoveItem(id: number): void {
    const { items } = this.sales;
    let item = items.find(it => it.itemDetails.id == id);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const index = items.indexOf(item);
      items.splice(index, 1);
    }
  }

  private loadSales(): void {
    // TODO: Mock data. Will be moved to some service.
    this.sales = new Sale(1, new Date());
    const items: SaleDetails[] = [];
    this.sales.items = items;

    const item1 = new SaleDetails(
      new SaleItem(1, "New Balance sneakers", 99.99, 1234567890),
      1,
      0,
      0,
      99.99
    );
    items.push(item1);
    let item2 = new SaleDetails(
      new SaleItem(2, "Canon EOS 650D", 305, 2234567890),
      1,
      0,
      0,
      305
    );
    items.push(item2);
    let item3 = new SaleDetails(
      new SaleItem(3, "Parrot Anafi Drone", 549, 3234567890),
      1,
      0,
      0,
      549
    );
    items.push(item3);
    let item4 = new SaleDetails(
      new SaleItem(4, "Sony Home Theatre System", 399.95, 4234567890),
      1,
      0,
      0,
      399.95
    );
    items.push(item4);
  }
}
