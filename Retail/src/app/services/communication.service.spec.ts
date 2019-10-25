import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommunicationService } from "./communication.service";
import { ShortenPipe } from "../helpers/pipes/shorten.pipe";
import { FilterPipe } from "../helpers/pipes/filter.pipe";
import { SaleButtonsComponent } from "../main/sale-buttons/sale-buttons.component";
import { ItemsComponent } from "../items/items.component";
import { ItemComponent } from "../items/item/item.component";
import { SignInComponent } from "../sign-in/sign-in.component";
import { HomeComponent } from "../main/home.component";
import { HeaderComponent } from "../main/header/header.component";
import { SaleItemsComponent } from "../main/sale-items/sale-items.component";
import { SaleItemComponent } from "../main/sale-items/sale-item/sale-item.component";
import { SaleListComponent } from "../main/sale-list/sale-list.component";
import { ModalWindowComponent } from "../dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "../dialog-box/confirmation/confirmation.component";

describe("CommunicationService", () => {
  beforeEach(() =>
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
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [CommunicationService]
    })
  );

  it("should be created", () => {
    const service: CommunicationService = TestBed.get(CommunicationService);
    expect(service).toBeTruthy();
  });
});
