import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Subscription } from "rxjs";
import { Sale } from "src/app/models/sale.model";
import { Status } from "src/app/models/status.model";
import { Message } from "src/app/models/message.model";

// This lets me use jQuery
declare var $: any;

@Component({
  selector: "app-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.sass"]
})
export class SaleListComponent implements OnInit, OnDestroy {
  title: string;
  isIncompleted: boolean;
  selectedSaleId: number = 0;
  sales: Array<Sale> = [];
  private subscription: Subscription;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.subscription = this.communicationService
      .getShowModal()
      .subscribe(msg => {
        if (msg) {
          this.title = msg.title;
          this.isIncompleted = msg.status == Status.isSaved;
          this.sales = msg.saleList;
          if (msg.showModal) this.showModal();
        }
      });
  }

  onRestore(): void {
    this.communicationService.sendSale(
      new Message(Status.isSaved, this.selectedSaleId)
    );
    this.hideModal();
  }

  getSaleClass(id: number): string {
    return this.selectedSaleId == id ? "table-primary" : "";
  }

  onSelectSale(id: number): void {
    this.selectedSaleId = id;
  }

  showModal(): void {
    $("#cmptSaleList").modal("show");
  }

  hideModal(): void {
    this.selectedSaleId = 0;
    document.getElementById("btnClose").click();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
