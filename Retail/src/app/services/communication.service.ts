import { Subject, Observable } from "rxjs";
import { Message } from "../models/message.model";

export class CommunicationService {
  saleInfoChanged = new Subject<Message>();
  saleButtonExecuted = new Subject<Message>();
  private itemSubject = new Subject<Message>();
  private modalSubject = new Subject<Message>();

  sendSaleInfo(message: Message): void {
    this.saleInfoChanged.next(message);
  }

  sendSaleStatus(message: Message): void {
    this.saleButtonExecuted.next(message);
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
