import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
  userFullName: string;
  currentDateTime: Date;
  title: string = "Retail";

  constructor(private router: Router) {
    const user: User = new User("Elkhan", "Mursali");
    this.userFullName = user.fullName;
    this.updateDateTime();
  }

  ngOnInit() {
    setInterval(() => this.updateDateTime(), 1000);
  }

  onLock(): void {
    this.router.navigate(["/sign-in"]);
  }

  private updateDateTime(): void {
    const date: Date = new Date();
    this.currentDateTime = date; // `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
