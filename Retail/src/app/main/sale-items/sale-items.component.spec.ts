import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SaleItemsComponent } from "./sale-items.component";
import { SaleItemComponent } from "./sale-item/sale-item.component";
import { SaleService } from "src/app/services/sale.service";
import { ItemService } from "src/app/services/item.service";
import { CommunicationService } from "src/app/services/communication.service";

describe("SaleItemsComponent", () => {
  let component: SaleItemsComponent;
  let fixture: ComponentFixture<SaleItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaleItemsComponent, SaleItemComponent],
      imports: [FormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [SaleService, ItemService, CommunicationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
