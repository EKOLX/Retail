import { SaleDetail } from "./SaleDetails";

export class Sale {
  constructor(public id: number, public date: Date) {}
  items: Array<SaleDetail>;
}
