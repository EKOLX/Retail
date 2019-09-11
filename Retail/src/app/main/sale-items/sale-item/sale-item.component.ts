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
  @Input() saleDetail: SaleDetail;
  @Output() amountChanged = new EventEmitter<boolean>();
  private item: Item;

  constructor(
    private communicationService: CommunicationService,
    private itemService: ItemService
  ) {}

  get displayName(): string {
    return `${
      this.item.name.length > 50
        ? this.item.name.substring(0, 50).concat("...")
        : this.item.name
    } ${this.saleDetail.discount > 0 ? this.saleDetail.discount + "%" : ""} : ${
      this.item.price
    }$ - ${this.saleDetail.totalAmount}$`;
  }

  ngOnInit() {
    this.item = this.itemService.getItemById(this.saleDetail.itemId);
  }

  onItemSelect(): void {
    let message = new Message(null, null, this.item);
    this.communicationService.sendItem(message);
  }

  onAddItem(): void {
    this.saleDetail.quantity += 1;

    let message = new Message(null, null, this.item);
    this.communicationService.sendItem(message);

    this.amountChanged.emit(false);
  }

  onRemoveItem(): void {
    let isRemoved: boolean = false;
    if (this.saleDetail.quantity > 1) {
      this.saleDetail.quantity -= 1;
    } else {
      isRemoved = true;
    }

    this.amountChanged.emit(isRemoved);
  }
}
