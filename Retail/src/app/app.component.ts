import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SaleService } from "./services/sale.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  constructor(saleService: SaleService, router: Router) {
    // TODO: Check for user activity and log out if he is not active certain time
    setInterval(() => {
      if (saleService.getSale().saleDetails.length == 0)
        if (router.url !== "/sign-in") {
          router.navigate(["/sign-in"]);
          console.warn(
            "Due to inactivity application was automatically locked out."
          );
        }
    }, 1000 * 60 * 3);
  }
}
