import { Injectable } from "@angular/core";
import { Sale, SaleDetail, SaleItem } from "../models/sale.model";

@Injectable({
  providedIn: "root"
})
export class SaleService {
  // Mock data. Will be moved to Node.js
  getSale(): Sale {
    const sale: Sale = new Sale(1234567890, new Date());
    const items: SaleDetail[] = [];

    sale.items = items;

    const item1 = new SaleDetail(
      new SaleItem(
        1,
        "New Balance sneakers",
        100,
        1234567890,
        "./assets/new_balance_sneakers.jpg"
      ),
      1,
      10
    );
    items.push(item1);
    let item2 = new SaleDetail(
      new SaleItem(
        2,
        "Canon EOS 650D",
        305,
        2234567890,
        "./assets/canon_eos_650d.jpg"
      ),
      1,
      5
    );
    items.push(item2);
    let item3 = new SaleDetail(
      new SaleItem(
        3,
        "Parrot Anafi Drone",
        549,
        3234567890,
        "./assets/parrot_anafi_drone.jpg"
      ),
      1,
      15
    );
    items.push(item3);
    let item4 = new SaleDetail(
      new SaleItem(
        4,
        "Sony Home Theatre System",
        399.95,
        4234567890,
        "./assets/sony_home_theatre_system.jpg"
      ),
      1,
      20
    );
    items.push(item4);
    let item5 = new SaleDetail(
      new SaleItem(
        5,
        "MacBook Pro 15-inch 8-core 5.0GHz 32GB 3.2GB/s SSD Storage Touch Bar Touch ID",
        2153,
        5234567890,
        "./assets/macBook_pro_15_inch.jpg"
      ),
      1,
      25
    );
    items.push(item5);
    let item6 = new SaleDetail(
      new SaleItem(6, "iPhone Xs", 729, 6234567890, "./assets/iPhone_Xs.jpg"),
      1,
      0
    );
    items.push(item6);

    return sale;
  }
}
