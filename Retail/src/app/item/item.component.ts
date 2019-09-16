import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Item } from "../models/sale.model";
import { ItemService } from "../services/item.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.sass"]
})
export class ItemComponent implements OnInit {
  item: Item;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const itemId: number = this.route.snapshot.params["id"];
    this.item = this.itemService.getItemById(itemId);
  }
}
