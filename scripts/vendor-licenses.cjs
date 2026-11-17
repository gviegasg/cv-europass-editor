const fs = require('node:fs');
const path = require('node:path');

const licenses = [
    ['mammoth', 'LICENSE'],
    ['@xmldom/xmldom', 'LICENSE'],
    ['base64-js', 'LICENSE'],
    ['dingbat-to-unicode', 'LICENSE'],
    ['jszip', 'LICENSE.markdown'],
    ['lop', 'LICENSE'],
    ['option', 'LICENSE'],
    ['underscore', 'LICENSE'],
    ['xmlbuilder', 'LICENSE'],
    ['pako', 'LICENSE'],
    ['lie', 'license.md'],
    ['immediate', 'LICENSE.txt'],
    ['readable-stream', 'LICENSE'],
    ['string_decoder', 'LICENSE'],
    ['inherits', 'LICENSE'],
    ['safe-buffer', 'LICENSE'],
    ['setimmediate', 'LICENSE.txt'],
    ['isarray', 'README.md'],
    ['util-deprecate', 'LICENSE'],
    ['core-util-is', 'LICENSE']
];

const notices = licenses.map(([name, filename]) => {
    const text = fs.readFileSync(path.join(__dirname, '..', 'node_modules', name, filename), 'utf8');
    return `===== ${name} =====\n${text.trim()}\n`;
});
fs.writeFileSync(path.join(__dirname, '..', 'vendor', 'THIRD-PARTY-NOTICES.txt'), notices.join('\n'));
