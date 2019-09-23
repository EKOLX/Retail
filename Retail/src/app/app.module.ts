import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./main/home.component";
import { HeaderComponent } from "./main/header/header.component";
import { SaleItemsComponent } from "./main/sale-items/sale-items.component";
import { SaleButtonsComponent } from "./main/sale-buttons/sale-buttons.component";
import { SaleListComponent } from "./main/sale-list/sale-list.component";
import { SaleItemComponent } from "./main/sale-items/sale-item/sale-item.component";
import { ItemComponent } from "./items/item/item.component";
import { ItemsComponent } from "./items/items.component";
import { ModalWindowComponent } from "./dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "./dialog-box/confirmation/confirmation.component";
import { SignInComponent } from "./sign-in/sign-in.component";

import { HighlightDirective } from "./directives/highlight.directive";

import { CommunicationService } from "./services/communication.service";

import { AuthGuard } from "./guards/auth.guard";
import { LockOutGuard } from "./guards/lock-out.guard";

import { ShortenPipe } from "./helpers/shorten.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SaleItemsComponent,
    SaleButtonsComponent,
    SaleListComponent,
    SaleItemComponent,
    ItemComponent,
    ItemsComponent,
    ModalWindowComponent,
    ConfirmationComponent,
    SignInComponent,
    HighlightDirective,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [CommunicationService, AuthGuard, LockOutGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
