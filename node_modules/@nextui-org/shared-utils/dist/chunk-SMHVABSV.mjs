// src/numbers.ts
function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}
function clampPercentage(value, max = 100) {
  return Math.min(Math.max(value, 0), max);
}

export {
  range,
  clampPercentage
};
