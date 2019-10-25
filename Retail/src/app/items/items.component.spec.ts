import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from "../helpers/pipes/filter.pipe";
import { ShortenPipe } from "../helpers/pipes/shorten.pipe";
import { ItemsComponent } from "./items.component";
import { ItemComponent } from "./item/item.component";
import { SignInComponent } from "../sign-in/sign-in.component";
import { HomeComponent } from "../main/home.component";
import { HeaderComponent } from "../main/header/header.component";
import { SaleItemsComponent } from "../main/sale-items/sale-items.component";
import { SaleItemComponent } from "../main/sale-items/sale-item/sale-item.component";
import { SaleButtonsComponent } from "../main/sale-buttons/sale-buttons.component";
import { SaleListComponent } from "../main/sale-list/sale-list.component";
import { ModalWindowComponent } from "../dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "../dialog-box/confirmation/confirmation.component";

describe("ItemsComponent", () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemsComponent,
        ItemComponent,
        SignInComponent,
        HomeComponent,
        HeaderComponent,
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
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
