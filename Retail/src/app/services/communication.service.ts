import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Message } from "../models/message.model";

@Injectable({
  providedIn: "root"
})
export class CommunicationService {
  private saleSubject = new Subject<Message>();
  private itemSubject = new Subject<Message>();
  private statusSubject = new Subject<Message>();
  private modalSubject = new Subject<boolean>();

  sendSale(message: Message): void {
    this.saleSubject.next(message);
  }

  getSale(): Observable<Message> {
    return this.saleSubject.asObservable();
  }

  sendSaleStatus(message: Message): void {
    this.statusSubject.next(message);
  }

  getSaleStatus(): Observable<Message> {
    return this.statusSubject.asObservable();
  }

  sendItem(message: Message): void {
    this.itemSubject.next(message);
  }

  getItem(): Observable<Message> {
    return this.itemSubject.asObservable();
  }

  clearItem(): void {
    this.itemSubject.next();
  }

  sendShowModal(value: boolean): void {
    this.modalSubject.next(value);
  }

  getShowModal(): Observable<boolean> {
    return this.modalSubject.asObservable();
  }
}
