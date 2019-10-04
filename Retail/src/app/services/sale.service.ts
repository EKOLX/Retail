import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Sale, SaleDetail, Item } from "../models/sale.model";
import { Status } from "../models/state.model";
import { LocalStorageHelper } from "../helpers/localStorageHelper";
import { ItemService } from "./item.service";
import { RestService } from "./rest.service";
import { CommonHelper } from "../helpers/commonHelper";

@Injectable({
  providedIn: "root"
})
export class SaleService {
  saleChanged = new Subject<Sale>();

  private currentSale: Sale;
  private completedSales: Sale[] = [];
  private savedSales: Sale[] = [];
  private saleKey: string = "sale";

  // TODO: Return copy not original and handle event on change. Do it in each method
  constructor(private itemService: ItemService, private rest: RestService) {
    this.currentSale = this.getMockSale();
    this.saleChanged.next(this.currentSale);
  }

  getSale(): Sale {
    if (LocalStorageHelper.checkDataByKey(this.saleKey)) {
      const localSale = LocalStorageHelper.getDataByKey(this.saleKey) as Sale;
      const saleDetails: Array<SaleDetail> = [];
      localSale.saleDetails.forEach(el => {
        const saleDetail: SaleDetail = new SaleDetail(
          el.itemId,
          el.price,
          el.quantity,
          el.discount
        );
        saleDetails.push(saleDetail);
      });
      // this.currentSale.id = localSale.id;
      // this.currentSale.date = localSale.date;
      // this.currentSale.saleDetails = saleDetails;
    } else {
      LocalStorageHelper.setDataByKey(this.saleKey, this.currentSale);
    }

    return this.cloneSale(this.currentSale);
  }

  addItemToSale(item: Item) {
    let currentDetail = this.currentSale.saleDetails.find(
      sd => sd.itemId == item.id
    );

    if (currentDetail) {
      currentDetail.quantity++;
    } else {
      const newSaleDetail = new SaleDetail(item.id, item.price, 1, 0);
      this.currentSale.saleDetails.push(newSaleDetail);
    }

    LocalStorageHelper.setDataByKey(this.saleKey, this.currentSale);
  }

  changeItemCountInSale(saleDetail: SaleDetail) {
    let currentDetail = this.currentSale.saleDetails.find(
      sd => sd.itemId == saleDetail.itemId
    );
    if (saleDetail.quantity > 0) {
      currentDetail.quantity = saleDetail.quantity;
    } else {
      const index = this.currentSale.saleDetails.indexOf(currentDetail);
      this.currentSale.saleDetails.splice(index, 1);
    }

    LocalStorageHelper.setDataByKey(this.saleKey, this.currentSale);
  }

  moveSavedSaleToCurrent(saleId: number): void {
    if (this.currentSale.saleDetails.length > 0) {
      alert("Current sale is not empty.");
      return;
    }
    this.currentSale = this.cloneSale(
      this.savedSales.find(s => s.id == saleId)
    );
    const index = this.savedSales.indexOf(this.currentSale);
    this.savedSales.splice(index, 1);
    this.saleChanged.next(this.cloneSale(this.currentSale));
  }

  getSalesByStatus(status: Status): Array<Sale> {
    if (status == Status.isSaved) return this.savedSales;
    else if (status == Status.isCompleted) return this.completedSales;
    else return null;
  }

  saveSale(sale: Sale): void {
    this.savedSales.push(sale);
    this.currentSale = this.createNewSale();

    LocalStorageHelper.setDataByKey(this.saleKey, this.currentSale);
    this.saleChanged.next(this.cloneSale(this.currentSale));
  }

  completeSale(sale: Sale): void {
    this.rest.postSale(sale).subscribe(
      (response: Response) => {
        // console.log(response);
      },
      (error: Response) => console.log(error)
    );

    this.completedSales.push(sale);
    this.currentSale = this.createNewSale();

    LocalStorageHelper.setDataByKey(this.saleKey, this.currentSale);
    this.saleChanged.next(this.cloneSale(this.currentSale));
  }

  clearSaleItems(): void {
    this.currentSale.saleDetails = [];

    LocalStorageHelper.setDataByKey(this.saleKey, this.currentSale);
    this.saleChanged.next(this.cloneSale(this.currentSale));
  }

  private cloneSale(sale: Sale): Sale {
    return Object.assign(new Sale(0), sale);
  }

  private createNewSale(): Sale {
    const newSale: Sale = new Sale(
      this.completedSales.length + this.savedSales.length + 1,
      new Date()
    );
    newSale.saleDetails = [];
    this.currentSale = newSale;
    return this.currentSale;
  }

  // TODO: will be removed
  private getMockSale(): Sale {
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
}
