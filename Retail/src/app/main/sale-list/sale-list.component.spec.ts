import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { SaleListComponent } from "./sale-list.component";
import { ModalWindowComponent } from "src/app/dialog-box/modal-window/modal-window.component";
import { ConfirmationComponent } from "src/app/dialog-box/confirmation/confirmation.component";

describe("SaleListComponent", () => {
  let component: SaleListComponent;
  let fixture: ComponentFixture<SaleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SaleListComponent,
        ModalWindowComponent,
        ConfirmationComponent
      ],
      imports: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: fix this
  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
