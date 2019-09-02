import { Component, OnInit } from "@angular/core";
import { SaleItem } from "src/app/models/SaleItem";

@Component({
  selector: "app-sale-items",
  templateUrl: "./sale-items.component.html",
  styleUrls: ["./sale-items.component.sass"]
})
export class SaleItemsComponent implements OnInit {
  saleItems: Array<SaleItem> = [];

  constructor() {
    this.loadSaleItems();
  }

  ngOnInit() {}

  private loadSaleItems(): void {
    let item1 = new SaleItem(1, "New Balance sneakers", 99.99, 1234567890);
    this.saleItems.push(item1);
    let item2 = new SaleItem(2, "Canon EOS 650D", 305, 2234567890);
    this.saleItems.push(item2);
    let item3 = new SaleItem(3, "Parrot Anafi Drone", 549, 3234567890);
    this.saleItems.push(item3);
  }
}
