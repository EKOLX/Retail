import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.sass"]
})
export class ItemComponent implements OnInit {
  itemId: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.params["id"];
  }
}
