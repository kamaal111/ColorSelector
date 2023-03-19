export function hexToRGB(hex: string) {
  const newHex = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_m, r, g, b) => r + r + g + g + b + b
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
  if (result == null) return null;

  return {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
  };
}

let colorsNamesObject = {};
function getAllColors() {
  if (Object.values(colorsNamesObject).length === 0) {
    colorsNamesObject = require("../../public/assets/color-names.json");
  }
  return colorsNamesObject;
}

export function getRandomHexColor() {
  const allColors = getAllColors();

  const allHexCodes = Object.keys(allColors);
  const index = Math.floor(Math.random() * allHexCodes.length);

  const randomHex = allHexCodes[index];
  return randomHex;
}
