import { Status } from "./state.model";
import { Sale, Item } from "./sale.model";

export class Message {
  constructor(
    public status: Status = Status.isNew,
    public saleId: number = 0,
    public item: Item = null,
    public saleList: Array<Sale> = [],
    public showModal: boolean = false,
    public title: string = null
  ) {}
}
