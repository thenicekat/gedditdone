"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/theme.ts
var theme_exports = {};
__export(theme_exports, {
  createSpacingUnits: () => createSpacingUnits,
  generateSpacingScale: () => generateSpacingScale,
  isBaseTheme: () => isBaseTheme
});
module.exports = __toCommonJS(theme_exports);

// src/types.ts
var spacingScaleKeys = [
  "0",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
  "1",
  "2",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96"
];
var mappedSpacingScaleKeys = spacingScaleKeys.map((key) => `unit-${key}`);

// src/utils/theme.ts
var isBaseTheme = (theme) => theme === "light" || theme === "dark";
var ROOT_FONT_SIZE = 16;
var baseScale = [1, 2, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var extendedScale = [20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
var generateSpacingScale = (spacingUnit) => {
  const scaleLabels = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5.5,
    xl: 9,
    "2xl": 12,
    "3xl": 20,
    "4xl": 30,
    "5xl": 56,
    "6xl": 72,
    "7xl": 96,
    "8xl": 128,
    "9xl": 160
  };
  const scale = { 0: "0px" };
  Object.entries(scaleLabels).forEach(([label, multiplier]) => {
    scale[label] = multiplier ? `${spacingUnit * multiplier / ROOT_FONT_SIZE}rem` : `${spacingUnit / ROOT_FONT_SIZE}rem`;
  });
  baseScale.forEach((i) => {
    let key = `${i}`;
    if (key.includes(".")) {
      const [first, second] = key.split(".");
      key = `${first}_${second}`;
    }
    scale[key] = `${spacingUnit * i / ROOT_FONT_SIZE}rem`;
  });
  extendedScale.forEach((i) => {
    const key = `${i}`;
    scale[key] = `${spacingUnit * i / ROOT_FONT_SIZE}rem`;
  });
  return scale;
};
function createSpacingUnits(prefix) {
  let result = spacingScaleKeys.reduce((acc, key) => {
    let value = `var(--${prefix}-spacing-unit-${key})`;
    if (key.includes(".")) {
      const [first, second] = key.split(".");
      value = `var(--${prefix}-spacing-unit-${first}_${second})`;
    }
    return {
      ...acc,
      [`unit-${key}`]: value
    };
  }, {});
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSpacingUnits,
  generateSpacingScale,
  isBaseTheme
});
