import {
  spacingScaleKeys
} from "./chunk-WA5F6AED.mjs";

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

export {
  isBaseTheme,
  generateSpacingScale,
  createSpacingUnits
};
