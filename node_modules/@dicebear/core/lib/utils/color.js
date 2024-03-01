export function convertColor(color) {
    return 'transparent' === color ? color : `#${color}`;
}
export function getBackgroundColors(prng, backgroundColor) {
    var _a;
    let shuffledBackgroundColors;
    if (backgroundColor.length <= 2) {
        // A function call should in any case make an identical number of calls to the PRNG.
        prng.next();
        shuffledBackgroundColors = backgroundColor;
    }
    else {
        shuffledBackgroundColors = prng.shuffle(backgroundColor);
    }
    if (shuffledBackgroundColors.length === 0) {
        shuffledBackgroundColors = ['transparent'];
    }
    const primary = shuffledBackgroundColors[0];
    const secondary = (_a = shuffledBackgroundColors[1]) !== null && _a !== void 0 ? _a : shuffledBackgroundColors[0];
    return {
        primary: convertColor(primary),
        secondary: convertColor(secondary),
    };
}
