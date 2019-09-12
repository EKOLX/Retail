import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { SaleService } from "src/app/services/sale.service";
import { CommunicationService } from "src/app/services/communication.service";
import { Message } from "src/app/models/message.model";
import {
  Status,
  ModalSize,
  ModalDialog,
  ModalNature
} from "src/app/models/state.model";
import { Sale } from "src/app/models/sale.model";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnInit, OnDestroy {
  billNumber: number;
  itemImageUrl: string;
  itemDisplayName: string;
  showSaleItemButton1: boolean;
  saleItemCollection: Array<Sale> = [];
  modalDialog: ModalDialog;
  private subscription: Subscription;

  constructor(
    private communicationService: CommunicationService,
    private saleService: SaleService
  ) {
    this.subscription = this.communicationService
      .getSaleInfo()
      .subscribe(msg => {
        if (msg) this.billNumber = msg.saleId;
      });
    this.communicationService.getItem().subscribe(msg => {
      if (msg) {
        this.itemImageUrl = msg.item.imageUrl;
        this.itemDisplayName = `${msg.item.name} - barcode: ${msg.item.barcode}`;
      } else {
        // Clear image source if empty image is sent
        this.itemImageUrl = null;
        this.itemDisplayName = null;
      }
    });

    this.modalDialog = new ModalDialog();
  }

  ngOnInit() {}

  onCompleted(): void {
    this.modalDialog = new ModalDialog(
      "CompletedList",
      ModalSize.lg,
      ModalNature.secondary,
      "Completed list"
    );
    this.showSaleItemButton1 = false;
    this.saleItemCollection = this.saleService.getSalesByStatus();
  }

  onIncompleted(): void {
    this.modalDialog = new ModalDialog(
      "IncompletedList",
      ModalSize.lg,
      ModalNature.secondary,
      "Incompleted list"
    );
    this.showSaleItemButton1 = true;
    this.saleItemCollection = this.saleService.getSalesByStatus(Status.isSaved);
  }

  onSave(): void {
    this.modalDialog = new ModalDialog(
      "Saved",
      ModalSize.sm,
      ModalNature.info,
      "Saving confirmation",
      "Do you want to save the current sale and continue with new one?"
    );
  }

  onClear(): void {
    this.modalDialog = new ModalDialog(
      "Cleared",
      ModalSize.sm,
      ModalNature.danger,
      "Canceling sale",
      "Are you sure, you want to delete the sale?"
    );
  }

  onComplete(): void {
    this.modalDialog = new ModalDialog(
      "Completed",
      ModalSize.sm,
      ModalNature.success,
      "Completing sale",
      "Do you want to complete the sale?"
    );
  }

  onConfirmClicked(): void {
    if (this.modalDialog.type == "Saved")
      this.communicationService.sendSaleStatus(new Message(Status.isSaved));
    else if (this.modalDialog.type == "Cleared")
      this.communicationService.sendSaleStatus(new Message(Status.isRemoved));
    else if (this.modalDialog.type == "Completed")
      this.communicationService.sendSaleStatus(new Message(Status.isCompleted));
    else if (this.modalDialog.type == "IncompletedList") {
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
