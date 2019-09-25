import { Component } from "@angular/core";
import { Item } from "../models/sale.model";
import { MathHelper } from "../helpers/mathHelper";
import { ItemService } from "../services/item.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.sass"]
})
export class ItemsComponent {
  items: Array<Item>;
  filteredItem: string = "";
  remainder: number;

  constructor(itemService: ItemService) {
    this.items = itemService.getItems();
    this.remainder = MathHelper.getRandomIntInclusive(1, 10);
  }

  clearFilter(): void {
    this.filteredItem = "";
  }
}
