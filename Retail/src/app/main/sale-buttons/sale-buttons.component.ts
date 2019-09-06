import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sale-buttons",
  templateUrl: "./sale-buttons.component.html",
  styleUrls: ["./sale-buttons.component.sass"]
})
export class SaleButtonsComponent implements OnInit, OnDestroy {
  billNumber: number;
  itemImageUrl: string;
  itemName: string;
  subscription: Subscription;

  constructor(private communicationService: CommunicationService) {
    this.subscription = this.communicationService.getSale().subscribe(sale => {
      if (sale) this.billNumber = sale.id;
    });
    this.communicationService.getSaleItem().subscribe(saleItem => {
      if (saleItem) {
        this.itemImageUrl = saleItem.imageUrl;
        this.itemName = saleItem.name;
      } else {
        // Clear image source if empty image is sent
        this.itemImageUrl = null;
        this.itemName = null;
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
