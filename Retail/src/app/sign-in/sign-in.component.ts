import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.sass"]
})
export class SignInComponent implements OnInit {
  userName: string;
  constructor() {
    // TODO: use localStorage
    this.userName = "Elkhan Mursali";
  }

  ngOnInit() {}
}
