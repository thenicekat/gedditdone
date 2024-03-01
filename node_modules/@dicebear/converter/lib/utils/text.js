let encoder;
export function getEncoder() {
    if (!encoder) {
        encoder = new TextEncoder();
    }
    return encoder;
}
