const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check JS syntax
const scriptMatch = html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
  console.error('FAIL: Could not find inline script');
  process.exit(1);
}
const js = scriptMatch[1];
try {
  new vm.Script(js);
  console.log('PASS: JavaScript syntax valid in index.html');
} catch (e) {
  console.error('FAIL: JavaScript syntax error:', e.message);
  process.exit(1);
}

// 2. Check factory instantiations
const tests = [
  ['makeGoldFactory(-96, 78)', html.includes('makeGoldFactory(-96, 78)')],
  ['makeWoodToysFactory(0, 78)', html.includes('makeWoodToysFactory(0, 78)')],
  ['makeCopperSolarFactory(96, 78)', html.includes('makeCopperSolarFactory(96, 78)')],
  ['makeMall1(-96, -50)', html.includes('makeMall1(-96, -50)')],
  ['makeMall2(96, -50)', html.includes('makeMall2(96, -50)')],
  ['GOLD pin', html.includes("makeLandmarkPin('GOLD', 'Gold Factory', '#eab308', -96, 18, 78)")],
  ['WOOD·TOYS pin', html.includes("makeLandmarkPin('WOOD·TOYS', 'Wood & Toys', '#16a34a', 0, 18, 78)")],
  ['COPPER·SOLAR pin', html.includes("makeLandmarkPin('COPPER·SOLAR', 'Copper & Solar', '#ea580c', 96, 18, 78)")],
  ['MALL 1 pin', html.includes("makeLandmarkPin('MALL 1', 'Grand Plaza', '#2563eb', -96, 18, -50)")],
  ['MALL 2 pin', html.includes("makeLandmarkPin('MALL 2', 'Crystal Galleria', '#d97706', 96, 18, -50)")],
  ['initBlockFeatures factory clearance', html.includes('if (k !== -1 && k !== 0 && k !== 1)')],
  ['initBlockFeatures mall clearance', html.includes('if (k !== -1 && k !== 1)')],
  ['Raycast landmarks', html.includes("'landmark:factory_gold'") && html.includes("'landmark:factory_wood_toys'") && html.includes("'landmark:factory_copper_solar'")],
  ['Search keywords for all 3 factories', html.includes("v.includes('GOLD')") && html.includes("v.includes('WOOD')") && html.includes("v.includes('COPPER')")]
];

let allPassed = true;
tests.forEach(([label, pass]) => {
  if (pass) {
    console.log(`PASS: ${label}`);
  } else {
    console.error(`FAIL: ${label}`);
    allPassed = false;
  }
});

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nALL 14 CHECKS PASSED!');
}
