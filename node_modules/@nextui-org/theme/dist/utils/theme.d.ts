/**
 * Determines if the theme is a base theme
 *
 * @param theme string
 * @returns "light" | "dark
 */
declare const isBaseTheme: (theme: string) => boolean;
declare const generateSpacingScale: (spacingUnit: number) => Partial<Record<string, string>>;
declare function createSpacingUnits(prefix: string): Record<string, string>;

export { createSpacingUnits, generateSpacingScale, isBaseTheme };
