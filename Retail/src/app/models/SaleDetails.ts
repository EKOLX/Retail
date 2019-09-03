import { SaleItem } from "./SaleItem";

export class SaleDetails {
  constructor(
    public itemDetails: SaleItem,
    public quantity: number,
    public discount: number,
    public discountAmount: number,
    public totalAmount: number
  ) {}

  displayName: string = `${this.itemDetails.name} : ${this.itemDetails.price}$ - barcode: ${this.itemDetails.barcode}`;
}
