import { Component, OnInit } from "@angular/core";
import { Item } from "../models/sale.model";
import { ItemService } from "../services/item.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.sass"]
})
export class ItemsComponent implements OnInit {
  items: Array<Item>;
  // TODO: Implement functionality which shows remainder of items
  remainder: number = 8;

  constructor(private itemService: ItemService) {
    this.items = itemService.getItems();
  }

  ngOnInit() {}
}
