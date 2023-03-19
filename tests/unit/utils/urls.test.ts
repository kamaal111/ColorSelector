import { makeAppArgumentURL, Paths } from "../../../src/utils/urls";

const baseUniversalLink = "https://kamaal.io/colorselector/";

describe("makeAppArgumentURL", () => {
  it("returns base universal link", () => {
    const url = makeAppArgumentURL({});

    expect(url.toString()).toEqual(baseUniversalLink);
  });

  it("returns universal link with edit path", () => {
    const path = Paths.edit;

    const url = makeAppArgumentURL({ path });

    expect(url.toString()).toEqual(`${baseUniversalLink}${path}`);
  });

  it("returns universal link with edit path and params", () => {
    const path = Paths.edit;
    const hex = "327da0";
    const name = "Kamaal";

    const url = makeAppArgumentURL({
      path,
      params: { hex, name },
    });

    expect(url.toString()).toEqual(
      `${baseUniversalLink}${path}?hex=${hex}&name=${name}`
    );
  });

  it("returns universal link with edit path without params", () => {
    const path = Paths.edit;

    const url = makeAppArgumentURL({
      path,
      params: {},
    });

    expect(url.toString()).toEqual(`${baseUniversalLink}${path}`);
  });
});
