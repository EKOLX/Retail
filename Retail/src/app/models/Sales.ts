import { SaleDetails } from "./SaleDetails";

export class Sale {
  constructor(public id: number, public date: Date) {}
  items: Array<SaleDetails>;
}
