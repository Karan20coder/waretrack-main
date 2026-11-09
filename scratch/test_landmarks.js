const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('makeFactory(0, 78):', html.includes('makeFactory(0, 78)'));
console.log('makeMall1(-96, -50):', html.includes('makeMall1(-96, -50)'));
console.log('makeMall2(96, -50):', html.includes('makeMall2(96, -50)'));
console.log('PLANT pin at (0, 18, 78):', html.includes("makeLandmarkPin('PLANT', 'Titan Factory', '#ea580c', 0, 18, 78)"));
console.log('MALL 1 pin at (-96, 18, -50):', html.includes("makeLandmarkPin('MALL 1', 'Grand Plaza', '#2563eb', -96, 18, -50)"));
console.log('MALL 2 pin at (96, 18, -50):', html.includes("makeLandmarkPin('MALL 2', 'Crystal Galleria', '#d97706', 96, 18, -50)"));
console.log('Inspector cards present:', html.includes("s.kind === 'factory'") && html.includes("s.kind === 'mall'"));
console.log('Search jumps present:', html.includes("v.includes('FACTORY')") && html.includes("v.includes('MALL 2')") && html.includes("v.includes('MALL')"));
