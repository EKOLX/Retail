import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Subscription } from "rxjs";
import { Sale } from "src/app/models/sale.model";
import { Status, ModalSize, ModalNature } from "src/app/models/state.model";
import { Message } from "src/app/models/message.model";

@Component({
  selector: "app-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.sass"]
})
export class SaleListComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() showSaleItemButton1: boolean;
  @Input() sales: Array<Sale> = [];

  modalSize: ModalSize = ModalSize.lg;
  modalNature: ModalNature = ModalNature.secondary;
  selectedSaleId: number = 0;
  private subscription: Subscription;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {}

  onRestore(): void {
    this.communicationService.sendSale(
      new Message(Status.isSaved, this.selectedSaleId)
    );
  }

  onSelectSale(id: number): void {
    this.selectedSaleId = id;
  }

  onCancelClicked(): void {
    this.selectedSaleId = 0;
  }

  getSaleClass(id: number): string {
    return this.selectedSaleId == id ? "table-primary" : "";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
