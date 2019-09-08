import { Status } from "./status.model";
import { Sale } from "./sale.model";

export class Message {
  constructor(
    public status: Status = Status.isNew,
    public billNumber: number = 0,
    public itemName: string = null,
    public itemImageUrl: string = null,
    public showModal: boolean = false,
    public title: string = null,
    public saleList: Array<Sale> = []
  ) {}
}
