export class Sale {
  constructor(public id: number, public date: Date) {}
  items: Array<SaleDetail>;
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
    public itemDetail: Item,
    public quantity: number,
    public discount: number
  ) {}

  get discountAmount(): number {
    return (this.quantity * this.itemDetail.price * this.discount) / 100;
  }

  get totalAmount(): number {
    return this.itemDetail.price * this.quantity;
  }

  get displayName(): string {
    return `${
      this.itemDetail.name.length > 50
        ? this.itemDetail.name.substring(0, 50).concat("...")
        : this.itemDetail.name
    } : ${this.itemDetail.price}$ ${
      this.discount > 0 ? -this.discount + "%" : ""
    } - barcode: ${this.itemDetail.barcode}`;
  }
}
