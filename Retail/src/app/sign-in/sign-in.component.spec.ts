import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShortenPipe } from "../helpers/pipes/shorten.pipe";
import { FilterPipe } from "../helpers/pipes/filter.pipe";
import { SignInComponent } from "./sign-in.component";
import { HomeComponent } from "../main/home.component";
import { HeaderComponent } from "../main/header/header.component";
import { ItemsComponent } from "../items/items.component";
import { ItemComponent } from "../items/item/item.component";
import { SaleItemsComponent } from "../main/sale-items/sale-items.component";
import { SaleItemComponent } from "../main/sale-items/sale-item/sale-item.component";
import { SaleButtonsComponent } from "../main/sale-buttons/sale-buttons.component";
import { SaleListComponent } from "../main/sale-list/sale-list.component";
import { ModalWindowComponent } from "../dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "../dialog-box/confirmation/confirmation.component";

describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignInComponent,
        HomeComponent,
        HeaderComponent,
        ItemsComponent,
        ItemComponent,
        SaleItemsComponent,
        SaleItemComponent,
        SaleButtonsComponent,
        SaleListComponent,
        ModalWindowComponent,
        ConfirmationComponent,
        FilterPipe,
        ShortenPipe
      ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
