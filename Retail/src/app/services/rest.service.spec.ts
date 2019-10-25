import { TestBed } from "@angular/core/testing";

import { RestService } from "./rest.service";
import { HttpClientModule } from "@angular/common/http";

describe("RestService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it("should be created", () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });
});
