import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnInit {
  ticketNumber: string;
  itemImageUrl: string;

  constructor() {
    this.ticketNumber = "0000000001";
    this.itemImageUrl = "https://picsum.photos/200";
  }

  ngOnInit() {}
}
