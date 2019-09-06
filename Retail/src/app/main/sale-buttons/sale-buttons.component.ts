import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnInit, OnDestroy {
  ticketNumber: number;
  itemImageUrl: string;
  subscription: Subscription;

  constructor(private communicationService: CommunicationService) {
    this.subscription = this.communicationService.getSale().subscribe(msg => {
      if (msg) this.ticketNumber = msg.id;
    });
    this.communicationService.getImageUrl().subscribe(msg => {
      if (msg) {
        this.itemImageUrl = msg;
      } else {
        // Clear image source if empty image is sent
        this.itemImageUrl = null;
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
