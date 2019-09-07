import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommunicationService } from "src/app/services/communication.service";
import { Message } from "src/app/models/message.model";
import { Status } from "src/app/models/status.model";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnInit, OnDestroy {
  billNumber: number;
  itemImageUrl: string;
  itemName: string;
  private subscription: Subscription;

  constructor(private communicationService: CommunicationService) {
    this.subscription = this.communicationService.getSale().subscribe(msg => {
      if (msg) this.billNumber = msg.billNumber;
    });
    this.communicationService.getItem().subscribe(msg => {
      if (msg) {
        this.itemImageUrl = msg.itemImageUrl;
        this.itemName = msg.itemName;
      } else {
        // Clear image source if empty image is sent
        this.itemImageUrl = null;
        this.itemName = null;
      }
    });
  }

  ngOnInit() {}

  showCompleted(): void {
    this.communicationService.sendShowModal(true);
  }

  showIncompleted(): void {
    this.communicationService.sendShowModal(true);
  }

  onComplete(): void {
    this.communicationService.sendSaleStatus(new Message(Status.isCompleted));
  }

  onClear(): void {
    this.communicationService.sendSaleStatus(new Message(Status.isRemoved));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
