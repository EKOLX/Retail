import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CommunicationService } from "src/app/services/communication.service";
import { ItemService } from "src/app/services/item.service";
import { SaleItemComponent } from "./sale-item.component";

describe("SaleItemComponent", () => {
  let component: SaleItemComponent;
  let fixture: ComponentFixture<SaleItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleItemComponent],
      providers: [CommunicationService, ItemService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: fix this
  xit("should create", () => {
    expect(component).toBeTruthy();
  });

  // TODO: fix this
  xit("should return data from ItemService when calling getItemById with value 1", () => {
    const itemService = fixture.debugElement.injector.get(ItemService);
    //fixture.detectChanges();
    expect(itemService.getItemById(1).barcode).toEqual(1234567890);
  });
});
