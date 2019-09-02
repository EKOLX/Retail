import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SaleItemsComponent } from "./main/sale-items/sale-items.component";
import { SaleButtonsComponent } from "./main/sale-buttons/sale-buttons.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaleItemsComponent,
    SaleButtonsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, AngularFontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
