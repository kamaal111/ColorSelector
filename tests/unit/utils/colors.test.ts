import { getRandomHexColor, hexToRGB } from "../../../src/utils/colors";

describe("hexToRGB", () => {
  it.each([
    ["ffffff", { red: 255, green: 255, blue: 255 }],
    ["#ffffff", { red: 255, green: 255, blue: 255 }],
    ["#26619c", { red: 38, green: 97, blue: 156 }],
    ["#000", { red: 0, green: 0, blue: 0 }],
  ])("transforms hex to rgb", (hex, rgb) => {
    expect(hexToRGB(hex)).toEqual(rgb);
  });

  it.each([["#2661"], ["#1111111"]])(
    "does not transform hex to rgb, because hex is invalid",
    (hex) => {
      expect(hexToRGB(hex)).toBeNull();
    }
  );
});

describe("getRandomHexColor", () => {
  it("gets a random color", () => {
    const randomHex = getRandomHexColor();
    expect(randomHex[0]).not.toEqual("#");
    expect(randomHex.length).toEqual(6);
  });
});
