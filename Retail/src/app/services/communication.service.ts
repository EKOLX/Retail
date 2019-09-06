import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Sale } from "../models/sale.model";

@Injectable({
  providedIn: "root"
})
export class CommunicationService {
  private saleSubject = new Subject<Sale>();
  private itemSubject = new Subject<string>();

  sendSale(message: Sale): void {
    this.saleSubject.next(message);
  }

  getSale(): Observable<Sale> {
    return this.saleSubject.asObservable();
  }

  sendImageUrl(url: string): void {
    this.itemSubject.next(url);
  }

  getImageUrl(): Observable<string> {
    return this.itemSubject.asObservable();
  }

  clearImageUrl(): void {
    this.itemSubject.next();
  }
}
