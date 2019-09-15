import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  constructor(router: Router) {
    // TODO: Check for user activity and log out if he is not active certain time
    setTimeout(() => {
      router.navigate(["/sign-in"]);
    }, 1000 * 60 * 3);
  }
}
