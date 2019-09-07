import { Status } from "./status.model";

export class Message {
  constructor(
    public status: Status = Status.isNew,
    public billNumber: number = 0,
    public itemName: string = null,
    public itemImageUrl: string = null
  ) {}
}
