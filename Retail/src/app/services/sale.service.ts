import { Injectable } from "@angular/core";
import { Sale, SaleDetail, Item } from "../models/sale.model";

@Injectable({
  providedIn: "root"
})
export class SaleService {
  // Mock data. Will be moved to Node.js
  private sales: Sale[] = [];
  private savedSales: Sale[] = [];

  getMockSale(): Sale {
    const sale: Sale = new Sale(1, new Date());
    const items: SaleDetail[] = [];
    sale.items = items;

    const item1 = new SaleDetail(
      new Item(
        1,
        "New Balance sneakers",
        100,
        1234567890,
        "./assets/new_balance_sneakers_42.jpg"
      ),
      1,
      10
    );
    items.push(item1);
    let item2 = new SaleDetail(
      new Item(
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
      new Item(
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
      new Item(
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
      new Item(
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
      new Item(6, "iPhone Xs", 729, 6234567890, "./assets/iPhone_Xs.jpg"),
      1,
      0
    );
    items.push(item6);

    return sale;
  }

  getSale(id: number): Sale {
    return this.sales.find(s => s.id == id);
  }

  getSales(saved: boolean = false): Array<Sale> {
    if (saved) return this.savedSales;
    else return this.sales;
  }

  saveSale(sale: Sale): Sale {
    this.savedSales.push(sale);
    return this.createNewSale();
  }

  completeSale(sale: Sale): Sale {
    this.sales.push(sale);
    return this.createNewSale();
  }

  private createNewSale(): Sale {
    const newSale: Sale = new Sale(
      this.sales.length + this.savedSales.length + 1,
      new Date()
    );
    const items: SaleDetail[] = [];
    newSale.items = items;
    return newSale;
  }
}
