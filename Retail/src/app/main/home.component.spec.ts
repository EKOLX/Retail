import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ShortenPipe } from "../helpers/pipes/shorten.pipe";
import { FilterPipe } from "../helpers/pipes/filter.pipe";
import { CommunicationService } from "../services/communication.service";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "./header/header.component";
import { SaleItemsComponent } from "./sale-items/sale-items.component";
import { SaleItemComponent } from "./sale-items/sale-item/sale-item.component";
import { SaleButtonsComponent } from "./sale-buttons/sale-buttons.component";
import { SaleListComponent } from "./sale-list/sale-list.component";
import { ModalWindowComponent } from "../dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "../dialog-box/confirmation/confirmation.component";
import { ItemsComponent } from "../items/items.component";
import { ItemComponent } from "../items/item/item.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        SaleItemsComponent,
        SaleItemComponent,
        SaleButtonsComponent,
        SaleListComponent,
        ModalWindowComponent,
        ConfirmationComponent,
        ItemsComponent,
        ItemComponent,
        ShortenPipe,
        FilterPipe
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [CommunicationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
