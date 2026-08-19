const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

content = content.replace(/0-3 months/g, '0-3 Months');
content = content.replace(/3-6 months/g, '3-6 Months');
content = content.replace(/6-12 months/g, '6-12 Months');
content = content.replace(/12\+ months/g, '12+ Months');

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
