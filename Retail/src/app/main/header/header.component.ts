import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../models/user.model";
import { SaleService } from "src/app/services/sale.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
  userFullName: string;
  currentDateTime: string;
  title: string = "Retail";

  constructor(private saleService: SaleService, private router: Router) {
    const user: User = new User("Elkhan", "Mursali");
    this.userFullName = user.fullName;
    this.updateDateTime();
  }

  ngOnInit() {
    setInterval(() => this.updateDateTime(), 1000);
  }

  onLock(): void {
    if (this.saleService.getSale().saleDetails.length > 0)
      alert(
        "Current sale is not empty. Before locking, the sale have to be saved or completed."
      );
    else this.router.navigate(["/sign-in"]);
  }

  private updateDateTime(): void {
    const date: Date = new Date();
    this.currentDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
