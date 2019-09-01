import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleButtonsComponent } from './sale-buttons.component';

describe('SaleButtonsComponent', () => {
  let component: SaleButtonsComponent;
  let fixture: ComponentFixture<SaleButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
