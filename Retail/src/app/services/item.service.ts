import { Injectable } from "@angular/core";
import { Item } from "../models/sale.model";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private items: Array<Item> = [];

  constructor() {
    this.loadItems();
  }

  getItems(): Array<Item> {
    return this.items;
  }

  getItemById(id: number): Item {
    return this.items.find(it => it.id == id);
  }

  addItem(item: Item): boolean {
    this.items.push(item);
    // In real app, working with storage would need to confirm data is added
    return true;
  }

  private loadItems(): void {
    // Mock data. Will be got from some storage

    const item1 = new Item(
      1,
      "New Balance sneakers",
      100,
      1234567890,
      "./assets/new_balance_sneakers_42.jpg"
    );
    this.items.push(item1);

    const item2 = new Item(
      2,
      "Canon EOS 650D",
      305,
      2234567890,
      "./assets/canon_eos_650d.jpg"
    );
    this.items.push(item2);

    const item3 = new Item(
      3,
      "Parrot Anafi Drone",
      549,
      3234567890,
      "./assets/parrot_anafi_drone.jpg"
    );
    this.items.push(item3);

    const item4 = new Item(
      4,
      "Sony Home Theatre System",
      399.95,
      4234567890,
      "./assets/sony_home_theatre_system.jpg"
    );
    this.items.push(item4);

    const item5 = new Item(
      5,
      "MacBook Pro 15-inch 8-core 5.0GHz 32GB 3.2GB/s SSD Storage Touch Bar Touch ID",
      2153,
      5234567890,
      "./assets/macBook_pro_15_inch.jpg"
    );
    this.items.push(item5);

    const item6 = new Item(
      6,
      "iPhone Xs",
      729,
      6234567890,
      "./assets/iPhone_Xs.jpg"
    );
    this.items.push(item6);
  }
}
