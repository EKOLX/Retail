import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./main/home.component";
import { HeaderComponent } from "./main/header/header.component";
import { ItemComponent } from "./items/item/item.component";
import { ItemsComponent } from "./items/items.component";
import { SaleItemsComponent } from "./main/sale-items/sale-items.component";
import { SaleButtonsComponent } from "./main/sale-buttons/sale-buttons.component";
import { SaleItemComponent } from "./main/sale-items/sale-item/sale-item.component";
import { SaleListComponent } from "./main/sale-list/sale-list.component";
import { ModalWindowComponent } from "./dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "./dialog-box/confirmation/confirmation.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HighlightDirective } from "./directives/highlight.directive";
import { CommunicationService } from "./services/communication.service";
import { AuthGuard } from "./guards/auth.guard";
import { LockOutGuard } from "./guards/lock-out.guard";
import { ShortenPipe } from "./helpers/pipes/shorten.pipe";
import { FilterPipe } from "./helpers/pipes/filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ItemComponent,
    ItemsComponent,
    SaleItemsComponent,
    SaleButtonsComponent,
    SaleItemComponent,
    SaleListComponent,
    ModalWindowComponent,
    ConfirmationComponent,
    SignInComponent,
    HighlightDirective,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [CommunicationService, AuthGuard, LockOutGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
