import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommunicationService } from "src/app/services/communication.service";
import { Message } from "src/app/models/message.model";
import { Status, ModalSize, ModalDialog } from "src/app/models/state.model";
import { SaleService } from "src/app/services/sale.service";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnInit, OnDestroy {
  billNumber: number;
  itemImageUrl: string;
  displayName: string;
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
        this.displayName = `${msg.item.name} - barcode: ${msg.item.barcode}`;
      } else {
        // Clear image source if empty image is sent
        this.itemImageUrl = null;
        this.displayName = null;
      }
    });

    this.modalDialog = new ModalDialog();
  }

  ngOnInit() {}

  showCompleted(): void {
    const message = new Message(Status.isCompleted);
    message.showModal = true;
    message.title = "Completed list";
    message.saleList = this.saleService.getSalesByStatus();
    this.communicationService.sendShowModal(message);
  }

  showIncompleted(): void {
    const message = new Message(Status.isSaved);
    message.showModal = true;
    message.title = "Incompleted list";
    message.saleList = this.saleService.getSalesByStatus(Status.isSaved);
    this.communicationService.sendShowModal(message);
  }

  onSave(): void {
    this.modalDialog.modalType = "Saved";
    this.modalDialog.modalSize = ModalSize.SM;
    this.modalDialog.modalTitle = "Saving confirmation";
    this.modalDialog.modalContent =
      "Do you want to save the current sale and continue with new one?";
  }

  onConfirmClicked(): void {
    if (this.modalDialog.modalType == "Saved")
      this.communicationService.sendSaleStatus(new Message(Status.isSaved));
  }

  onClear(): void {
    this.communicationService.sendSaleStatus(new Message(Status.isRemoved));
  }

  onComplete(): void {
    this.communicationService.sendSaleStatus(new Message(Status.isCompleted));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
