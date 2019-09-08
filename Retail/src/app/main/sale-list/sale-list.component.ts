import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Subscription } from "rxjs";
import { Sale } from "src/app/models/sale.model";

// This lets me use jQuery
declare var $: any;

@Component({
  selector: "app-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.sass"]
})
export class SaleListComponent implements OnInit, OnDestroy {
  title: string;
  sales: Array<Sale> = [];
  private subscription: Subscription;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.subscription = this.communicationService
      .getShowModal()
      .subscribe(msg => {
        if (msg) {
          this.title = msg.title;
          this.sales = msg.saleList;
          if (msg.showModal) this.showModal();
        }
      });
  }

  showModal(): void {
    $("#cmptSaleList").modal("show");
  }

  hideModal(): void {
    document.getElementById("btnClose").click();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
