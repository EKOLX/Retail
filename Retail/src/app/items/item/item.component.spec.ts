import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of, from } from "rxjs";
import { ItemComponent } from "./item.component";
import { ItemService } from "src/app/services/item.service";

describe("ItemComponent", () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        ItemService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{ id: 1 }])
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: fix this
  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
