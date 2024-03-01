import * as _ from './escape.js';
export function xml(style) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const title = (_b = (_a = style.meta) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : 'Unnamed';
    const creator = (_d = (_c = style.meta) === null || _c === void 0 ? void 0 : _c.creator) !== null && _d !== void 0 ? _d : 'Unknown';
    let description = `"${title}" by "${creator}"`;
    if ((_f = (_e = style.meta) === null || _e === void 0 ? void 0 : _e.license) === null || _f === void 0 ? void 0 : _f.name) {
        description += `, licensed under "${style.meta.license.name}".`;
    }
    description += ' / Remix of the original. - Created with dicebear.com';
    const xmlTitle = `<dc:title>${_.xml(title)}</dc:title>`;
    const xmlCreator = '<dc:creator>' +
        `<cc:Agent rdf:about="${_.xml((_h = (_g = style.meta) === null || _g === void 0 ? void 0 : _g.homepage) !== null && _h !== void 0 ? _h : '')}">` +
        `<dc:title>${_.xml(creator)}</dc:title>` +
        '</cc:Agent>' +
        '</dc:creator>';
    const xmlSource = ((_j = style.meta) === null || _j === void 0 ? void 0 : _j.source)
        ? `<dc:source>${_.xml(style.meta.source)}</dc:source>`
        : '';
    const xmlLicense = ((_l = (_k = style.meta) === null || _k === void 0 ? void 0 : _k.license) === null || _l === void 0 ? void 0 : _l.url)
        ? `<cc:license rdf:resource="${_.xml(style.meta.license.url)}" />`
        : '';
    return (`<desc>${description}</desc>` +
        '<metadata' +
        ' xmlns:dc="http://purl.org/dc/elements/1.1/"' +
        ' xmlns:cc="http://creativecommons.org/ns#"' +
        ' xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
        '<rdf:RDF>' +
        '<cc:Work>' +
        xmlTitle +
        xmlCreator +
        xmlSource +
        xmlLicense +
        '</cc:Work>' +
        '</rdf:RDF>' +
        '</metadata>');
}
export function exif(style) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const title = (_b = (_a = style.meta) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : 'Unnamed';
    const creator = (_d = (_c = style.meta) === null || _c === void 0 ? void 0 : _c.creator) !== null && _d !== void 0 ? _d : 'Unknown';
    let copyright = `"${title}" by "${creator}"`;
    if ((_f = (_e = style.meta) === null || _e === void 0 ? void 0 : _e.license) === null || _f === void 0 ? void 0 : _f.name) {
        copyright += `, licensed under "${style.meta.license.name}".`;
    }
    copyright += ' / Remix of the original.';
    const exif = {
        ImageDescription: `${copyright} - Created with dicebear.com`,
        Copyright: copyright,
        'XMP-dc:Title': title,
        'XMP-dc:Creator': creator,
    };
    if ((_g = style.meta) === null || _g === void 0 ? void 0 : _g.source) {
        exif['XMP-dc:Source'] = style.meta.source;
    }
    if ((_j = (_h = style.meta) === null || _h === void 0 ? void 0 : _h.license) === null || _j === void 0 ? void 0 : _j.url) {
        exif['XMP-cc:License'] = style.meta.license.url;
    }
    return exif;
}
