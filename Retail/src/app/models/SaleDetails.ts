import { SaleItem } from "./SaleItem";

export class SaleDetail {
  discountAmount: number = (this.itemDetail.price * this.discount) / 100;
  totalAmount: number = this.itemDetail.price * this.quantity;

  displayName: string = `${
    this.itemDetail.name.length > 50
      ? this.itemDetail.name.substring(0, 50).concat("...")
      : this.itemDetail.name
  } : ${this.itemDetail.price}$ ${
    this.discount > 0 ? -this.discount + "%" : ""
  } - barcode: ${this.itemDetail.barcode}`;

  constructor(
    public itemDetail: SaleItem,
    public quantity: number,
    public discount: number
  ) {}
}
