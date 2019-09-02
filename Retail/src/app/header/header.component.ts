import { Component, OnInit } from "@angular/core";
import { User } from "../models/User";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
  userFullName: string;
  currentDateTime: string;
  title: string = "Retail";

  constructor() {
    const user: User = new User("Elkhan", "Mursali");
    this.userFullName = user.fullName;
    const date: Date = new Date();
    this.currentDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  ngOnInit() {}
}
