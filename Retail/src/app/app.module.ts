import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./main/header/header.component";
import { SaleItemsComponent } from "./main/sale-items/sale-items.component";
import { SaleButtonsComponent } from "./main/sale-buttons/sale-buttons.component";
import { SaleListComponent } from "./main/sale-list/sale-list.component";
import { SaleItemComponent } from "./main/sale-items/sale-item/sale-item.component";
import { ModalWindowComponent } from "./dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "./dialog-box/confirmation/confirmation.component";

import { HighlightDirective } from "./directives/highlight.directive";

import { CommunicationService } from "./services/communication.service";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./main/home.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "sign-in", component: SignInComponent }
];

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
    HighlightDirective,
    SignInComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFontAwesomeModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
