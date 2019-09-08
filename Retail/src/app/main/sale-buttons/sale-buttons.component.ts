import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CommunicationService } from "src/app/services/communication.service";
import { Message } from "src/app/models/message.model";
import { Status } from "src/app/models/status.model";
import { SaleService } from "src/app/services/sale.service";

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

  constructor(
    private communicationService: CommunicationService,
    private saleService: SaleService
  ) {
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
    const message = new Message();
    message.showModal = true;
    message.title = "Completed list";
    message.saleList = this.saleService.getSales();
    this.communicationService.sendShowModal(message);
  }

  showIncompleted(): void {
    const message = new Message();
    message.showModal = true;
    message.title = "Incompleted list";
    message.saleList = this.saleService.getSales(true);
    this.communicationService.sendShowModal(message);
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
