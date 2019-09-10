export class Sale {
  constructor(public id: number, public date: Date) {}
  saleDetails: Array<SaleDetail>;

  get totalAmount(): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const roundTo2 = value => Math.round(value * 100) / 100;
    return roundTo2(
      this.saleDetails.map(s => s.totalAmount).reduce(reducer, 0)
    );
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
    return this.price * this.quantity - this.discountAmount;
  }
}
