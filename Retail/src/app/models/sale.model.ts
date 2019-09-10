export class Sale {
  constructor(public id: number, public date: Date) {}
  items: Array<Item>;
  saleDetails: Array<SaleDetail>;

  get totalAmount(): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const roundTo2 = value => Math.round(value * 100) / 100;
    const discountAmount = this.saleDetails
      .map(s => s.discountAmount)
      .reduce(reducer, 0);
    const totalAmount = this.saleDetails
      .map(s => s.totalAmount)
      .reduce(reducer, 0);
    return roundTo2(totalAmount - discountAmount);
  }
}

export class Item {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public barcode: number,
    public imageUrl: string = ""
  ) {}

  get displayName(): string {
    return `${
      this.name.length > 50
        ? this.name.substring(0, 50).concat("...")
        : this.name
    } : ${this.price}$ - barcode: ${this.barcode}`;
  }
}

export class SaleDetail {
  constructor(
    public itemId: number,
    public price: number,
    public quantity: number,
    public discount: number
  ) {}

  get discountAmount(): number {
    return (this.quantity * this.price * this.discount) / 100;
  }

  get totalAmount(): number {
    return this.price * this.quantity;
  }
}
