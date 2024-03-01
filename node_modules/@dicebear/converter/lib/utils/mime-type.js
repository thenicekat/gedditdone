export function getMimeType(format) {
    switch (format) {
        case 'svg':
            return 'image/svg+xml';
        case 'png':
        case 'jpeg':
            return `image/${format}`;
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}
