import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommunicationService } from "src/app/services/communication.service";
import { Message } from "src/app/models/message.model";
import {
  Status,
  ModalSize,
  ModalDialog,
  ModalNature,
  ModalButton
} from "src/app/models/state.model";
import { Item } from "src/app/models/sale.model";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnDestroy {
  billNumber: number;
  item: Item;
  itemImageUrl: string;
  itemDisplayName: string;
  modalDialog: ModalDialog;
  private subscription: Subscription;

  constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {
    this.subscription = this.communicationService
      .getSaleInfo()
      .subscribe(msg => {
        if (msg) this.billNumber = msg.saleId;
      });
    this.communicationService.getItem().subscribe(msg => {
      if (msg) {
        this.item = msg.item;
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

  onMoreClicked(): void {
    this.router.navigate([`/item/${this.item.id}`]);
  }

  onCompleted(): void {
    this.modalDialog = new ModalDialog(
      "CompletedList",
      ModalSize.lg,
      ModalNature.secondary,
      "Completed list"
    );
    this.modalDialog.buttons.push(new ModalButton("button1", "", false, false));
  }

  onIncompleted(): void {
    this.modalDialog = new ModalDialog(
      "IncompletedList",
      ModalSize.lg,
      ModalNature.secondary,
      "Incompleted list"
    );
    this.modalDialog.buttons.push(
      new ModalButton("button1", "Restore", true, false)
    );
  }

  onSave(): void {
    this.modalDialog = new ModalDialog(
      "Saved",
      ModalSize.sm,
      ModalNature.info,
      "Saving confirmation",
      "Do you want to save the current sale and continue with new one?"
    );
    this.modalDialog.buttons.push(
      new ModalButton("button1", "Confirm", true, true)
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
    this.modalDialog.buttons.push(
      new ModalButton("button1", "Delete", true, true)
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
    this.modalDialog.buttons.push(
      new ModalButton("button1", "Shop", true, true)
    );
  }

  onConfirmClicked(): void {
    if (this.modalDialog.type == "Saved")
      this.communicationService.sendSaleStatus(new Message(Status.isSaved));
    else if (this.modalDialog.type == "Cleared")
      this.communicationService.sendSaleStatus(new Message(Status.isRemoved));
    else if (this.modalDialog.type == "Completed")
      this.communicationService.sendSaleStatus(new Message(Status.isCompleted));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
