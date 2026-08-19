const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

content = content.replace(/0-3 bulan/g, '0-3 Bulan');
content = content.replace(/3-6 bulan/g, '3-6 Bulan');
content = content.replace(/6-12 bulan/g, '6-12 Bulan');
content = content.replace(/12\+ bulan/g, '12+ Bulan');

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
