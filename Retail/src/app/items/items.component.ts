import { Component } from "@angular/core";
import { Item } from "../models/sale.model";
import { Helper } from "../helpers/helper";
import { ItemService } from "../services/item.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.sass"]
})
export class ItemsComponent {
  items: Array<Item>;

  constructor(itemService: ItemService) {
    this.items = itemService.getItems();
  }

  get remainder(): number {
    // TODO: Implement functionality which shows remainder of items
    return Helper.getRandomIntInclusive(1, 10);
  }
}
