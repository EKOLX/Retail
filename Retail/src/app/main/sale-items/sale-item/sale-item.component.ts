import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Message } from "src/app/models/message.model";
import { Sale, Item, SaleDetail } from "src/app/models/sale.model";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-sale-item",
  templateUrl: "./sale-item.component.html",
  styleUrls: ["./sale-item.component.sass"]
})
export class SaleItemComponent implements OnInit {
  @Input() sale: Sale;
  @Input() saleDetail: SaleDetail;
  @Output() amountChanged = new EventEmitter<boolean>();
  private item: Item;

  constructor(
    private communicationService: CommunicationService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.item = this.itemService.getItemById(this.saleDetail.itemId);
  }

  onItemSelect(): void {
    let message = new Message(null, null, this.item.name, this.item.imageUrl);
    this.communicationService.sendItem(message);
  }

  onAddItem(): void {
    this.saleDetail.quantity += 1;

    let message = new Message(null, null, this.item.name, this.item.imageUrl);
    this.communicationService.sendItem(message);

    this.amountChanged.emit(true);
  }

  onRemoveItem(): void {
    const { saleDetails } = this.sale;

    if (this.saleDetail.quantity > 1) {
      this.saleDetail.quantity -= 1;
    } else {
      const index = saleDetails.indexOf(this.saleDetail);
      saleDetails.splice(index, 1);
      this.communicationService.clearItem();
    }

    this.amountChanged.emit(true);
  }
}
