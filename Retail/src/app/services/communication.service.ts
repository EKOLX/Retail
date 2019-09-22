import { Subject, Observable } from "rxjs";
import { Message } from "../models/message.model";

export class CommunicationService {
  saleChanged = new Subject<Message>();
  saleInfoChanged = new Subject<Message>();
  private itemSubject = new Subject<Message>();
  private statusSubject = new Subject<Message>();
  private modalSubject = new Subject<Message>();

  sendSale(message: Message): void {
    this.saleChanged.next(message);
  }

  sendSaleInfo(message: Message): void {
    this.saleInfoChanged.next(message);
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

  sendShowModal(value: Message): void {
    this.modalSubject.next(value);
  }

  getShowModal(): Observable<Message> {
    return this.modalSubject.asObservable();
  }
}
