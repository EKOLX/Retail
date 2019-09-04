import { SaleDetail } from "./SaleDetail";

export class Sale {
  constructor(public id: number, public date: Date) {}
  items: Array<SaleDetail>;
}
