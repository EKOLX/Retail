import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SaleItemsComponent } from "./main/sale-items/sale-items.component";
import { SaleButtonsComponent } from "./main/sale-buttons/sale-buttons.component";
import { SaleListComponent } from "./main/sale-list/sale-list.component";
import { SaleItemComponent } from './main/sale-items/sale-item/sale-item.component';
import { ModalWindowComponent } from './dialog-box/modal-window/modal-window.component';
import { ConfirmationComponent } from './dialog-box/confirmation/confirmation.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaleItemsComponent,
    SaleButtonsComponent,
    SaleListComponent,
    SaleItemComponent,
    ModalWindowComponent,
    ConfirmationComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
