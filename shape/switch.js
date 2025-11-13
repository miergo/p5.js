const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sketchFile = process.argv[2];

if (!sketchFile) {
    console.error('Usage: node switch.js <sketch-file>');
    console.error('Example: node switch.js sketch.ts');
    console.error('Example: node switch.js Grid/helloShape.ts');
    process.exit(1);
}

const tsconfigPath = path.join(__dirname, 'tsconfig.json');
const indexHtmlPath = path.join(__dirname, 'index.html');

// Determine paths
let sketchPath, scriptSrc;
if (sketchFile.startsWith('src/')) {
    sketchPath = sketchFile;
    scriptSrc = `dist/${sketchFile.replace('src/', '').replace('.ts', '.js')}`;
} else if (sketchFile.includes('/')) {
    sketchPath = `src/${sketchFile}`;
    scriptSrc = `dist/${sketchFile.replace('.ts', '.js')}`;
} else {
    sketchPath = `src/${sketchFile}`;
    scriptSrc = `dist/${sketchFile.replace('.ts', '.js')}`;
}

// Verify file exists
const sketchFilePath = path.join(__dirname, sketchPath);
if (!fs.existsSync(sketchFilePath)) {
    console.error(`Error: File not found: ${sketchFilePath}`);
    process.exit(1);
}

// Update tsconfig.json - always include helper
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
tsconfig.include = ['src/utils/sketchHelper.ts', sketchPath];  // Add helper
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 4) + '\n');

// Update index.html - include helper script before sketch
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Remove any existing script tags first
indexHtml = indexHtml.replace(
    /<script src="dist\/utils\/sketchHelper\.js"><\/script>\s*/g,
    ''
);
indexHtml = indexHtml.replace(
    /<script src="dist\/[^"]+"><\/script>\s*/g,
    ''
);

// Add both scripts
indexHtml = indexHtml.replace(
    '</main>',
    `</main>\n    <script src="dist/utils/sketchHelper.js"></script>\n    <script src="${scriptSrc}"></script>`
);

fs.writeFileSync(indexHtmlPath, indexHtml);

console.log(`✓ Switched to: ${sketchFile}`);
console.log(`  TypeScript: ${sketchPath}`);
console.log(`  HTML script: ${scriptSrc}`);

// Build after switching (unless --no-build flag is present)
if (!process.argv.includes('--no-build')) {
    console.log('\nBuilding...');
    execSync('npx tsc', { stdio: 'inherit' });
}

