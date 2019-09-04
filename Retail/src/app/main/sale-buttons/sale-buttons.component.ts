import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnInit {
  ticketNumber: string;

  constructor() {
    this.ticketNumber = "0000000001";
  }

  ngOnInit() {}
}
