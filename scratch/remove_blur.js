const fs = require('fs');
const path = './src/app/(public)/LandingClientPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove all blur filters from framer motion animate/initial objects
content = content.replace(/filter:\s*isCenter[^,}]*,?/g, '');
content = content.replace(/filter:\s*['"`]blur\([^)]*\)['"`],?/g, '');

fs.writeFileSync(path, content);
