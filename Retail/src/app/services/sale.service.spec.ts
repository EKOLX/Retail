import { TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { SaleService } from "./sale.service";

describe("SaleService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it("should be created", () => {
    const service: SaleService = TestBed.get(SaleService);
    expect(service).toBeTruthy();
  });
});
