export class User {
  constructor(public firstName: string, public lastName: string) {}

  age: string;
  fullName: string = `${this.firstName} ${this.lastName}`;
}
