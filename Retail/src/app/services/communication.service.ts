import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Sale, Item } from "../models/sale.model";

@Injectable({
  providedIn: "root"
})
export class CommunicationService {
  private saleSubject = new Subject<Sale>();
  private itemSubject = new Subject<Item>();

  sendSale(message: Sale): void {
    this.saleSubject.next(message);
  }

  getSale(): Observable<Sale> {
    return this.saleSubject.asObservable();
  }

  sendSaleItem(saleItem: Item): void {
    this.itemSubject.next(saleItem);
  }

  getSaleItem(): Observable<Item> {
    return this.itemSubject.asObservable();
  }

  clearSaleItem(): void {
    this.itemSubject.next();
  }
}
