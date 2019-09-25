import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { SaleService } from "./sale.service";
import { Sale } from "../models/sale.model";

@Injectable({
  providedIn: "root"
})
export class RestService {
  constructor(private http: HttpClient, private saleService: SaleService) {}

  postSale(sale: Sale) {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.put(
      "https://retail-d7ecf.firebaseio.com/newSale.json",
      sale,
      {
        headers: header
      }
    );
  }
}
