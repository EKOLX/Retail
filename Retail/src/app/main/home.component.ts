import { Component } from "@angular/core";
import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SaleService } from "../services/sale.service";
import { CanComponentDeactivate } from "../guards/lock-out.guard";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"]
})
export class HomeComponent implements CanComponentDeactivate {
  constructor(private saleService: SaleService) {}

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.saleService.getSale().saleDetails.length > 0)
      return confirm("Sale list is not empty. Are you sure you want to leave?");
    else return true;
  }
}
