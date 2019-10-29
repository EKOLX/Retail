import { FilterPipe } from "./filter.pipe";

describe("Pipe: Filter", () => {
  it("should return result containing filtered items length", () => {
    const filterPipe = new FilterPipe();
    const girlsILoved = [
      { name: "Fidan" },
      { name: "Lyaman" },
      { name: "Ilduza" }
    ];
    const girlILike = "Ilduza";
    const propName = "name";
    expect(
      filterPipe.transform(girlsILoved, girlILike, propName).length
    ).toEqual(1);
  });

  it("should return result containing filtered items length", () => {
    const filterPipe = new FilterPipe();
    const girlsILoved = [
      { name: "Fidan" },
      { name: "Lyaman" },
      { name: "Ilduza" }
    ];
    const girlILike = "Ilduza";
    expect(
      filterPipe.transform(girlsILoved, girlILike, "name")[0].name
    ).toEqual("Ilduza");
  });
});
