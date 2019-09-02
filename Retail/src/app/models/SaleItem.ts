export class SaleItem {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public barcode: number
  ) {}

  displayName: string = `${this.name} : ${this.price}$ code: ${this.barcode}`;
}
