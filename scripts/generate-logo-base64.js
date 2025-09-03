const fs = require('fs');
const path = require('path');

// Read the logo file
const logoPath = path.join(__dirname, '../public/logo.png');
const logoBuffer = fs.readFileSync(logoPath);
const logoBase64 = logoBuffer.toString('base64');

// Create the output
const output = `// This file is auto-generated. Do not edit manually.
// Generated from public/logo.png

export const LOGO_BASE64 = 'data:image/png;base64,${logoBase64}';
`;

// Write to file
const outputPath = path.join(__dirname, '../src/app/api/og/logo-base64.ts');
fs.writeFileSync(outputPath, output);

console.log('Logo base64 generated successfully!');