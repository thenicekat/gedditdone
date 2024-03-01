/**
 * Returns an array of numbers, starting at `start` and ending at `end`.
 * @param start number
 * @param end number
 * @returns number[]
 */
declare function range(start: number, end: number): number[];
declare function clampPercentage(value: number, max?: number): number;

export { clampPercentage, range };
