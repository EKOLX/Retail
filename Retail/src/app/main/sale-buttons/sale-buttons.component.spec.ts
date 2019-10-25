import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommunicationService } from "src/app/services/communication.service";
import { ShortenPipe } from "src/app/helpers/pipes/shorten.pipe";
import { FilterPipe } from "src/app/helpers/pipes/filter.pipe";
import { SaleButtonsComponent } from "./sale-buttons.component";
import { ModalWindowComponent } from "src/app/dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "src/app/dialog-box/confirmation/confirmation.component";
import { SignInComponent } from "src/app/sign-in/sign-in.component";
import { SaleListComponent } from "../sale-list/sale-list.component";
import { HomeComponent } from "../home.component";
import { HeaderComponent } from "../header/header.component";
import { ItemsComponent } from "src/app/items/items.component";
import { ItemComponent } from "src/app/items/item/item.component";
import { SaleItemsComponent } from "../sale-items/sale-items.component";
import { SaleItemComponent } from "../sale-items/sale-item/sale-item.component";

describe("SaleButtonsComponent", () => {
  let component: SaleButtonsComponent;
  let fixture: ComponentFixture<SaleButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SaleButtonsComponent,
        ModalWindowComponent,
        ConfirmationComponent,
        SaleListComponent,
        SignInComponent,
        HomeComponent,
        HeaderComponent,
        ItemsComponent,
        ItemComponent,
        SaleItemsComponent,
        SaleItemComponent,
        FilterPipe,
        ShortenPipe
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [CommunicationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
