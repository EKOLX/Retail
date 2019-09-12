import { Injectable } from "@angular/core";
import { Sale, SaleDetail } from "../models/sale.model";
import { Status } from "../models/state.model";
import { ItemService } from "./item.service";

@Injectable({
  providedIn: "root"
})
export class SaleService {
  // Mock data. Will be moved to Node.js
  private sales: Sale[] = [];
  private savedSales: Sale[] = [];

  constructor(private itemService: ItemService) {}

  getMockSale(): Sale {
    const sale: Sale = new Sale(1, new Date());
    const saleDetails: SaleDetail[] = [];
    sale.saleDetails = saleDetails;

    const item1 = this.itemService.getItemById(1);
    const saleDetail1 = new SaleDetail(item1.id, item1.price, 1, 10);
    saleDetails.push(saleDetail1);

    let item2 = this.itemService.getItemById(2);
    const saleDetail2 = new SaleDetail(item2.id, item2.price, 1, 5);
    saleDetails.push(saleDetail2);

    let item3 = this.itemService.getItemById(3);
    const saleDetail3 = new SaleDetail(item3.id, item3.price, 1, 15);
    saleDetails.push(saleDetail3);

    let item4 = this.itemService.getItemById(4);
    const saleDetail4 = new SaleDetail(item4.id, item4.price, 1, 20);
    saleDetails.push(saleDetail4);

    let item5 = this.itemService.getItemById(5);
    const saleDetail5 = new SaleDetail(item5.id, item5.price, 1, 25);
    saleDetails.push(saleDetail5);

    let item6 = this.itemService.getItemById(6);
    const saleDetail6 = new SaleDetail(item6.id, item6.price, 1, 0);
    saleDetails.push(saleDetail6);

    return sale;
  }

  removeSavedSaleById(id: number): Sale {
    const sale = this.savedSales.find(s => s.id == id);
    const index = this.savedSales.indexOf(sale);
    this.savedSales.splice(index, 1);
    return sale;
  }

  getSalesByStatus(status: Status = Status.isCompleted): Array<Sale> {
    if (status == Status.isSaved) return this.savedSales;
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
    newSale.saleDetails = [];
    return newSale;
  }
}
