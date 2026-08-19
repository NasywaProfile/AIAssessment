const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// For ID
let targetID = `      level5: 'AI-Mature',
      industryLabel: 'Industry',
      allIndustries: 'All Industries',`;
let replacementID = `      level5: 'AI-Mature',
      allIndustries: 'All Industries',
      industryLabel: 'Industry',`;
content = content.replace(targetID, replacementID);

// For EN
let targetEN = `      level5: 'AI-Mature',
      industryLabel: 'Industry',
      allIndustries: 'All Industries',`;
let replacementEN = `      level5: 'AI-Mature',
      allIndustries: 'All Industries',
      industryLabel: 'Industry',`;
content = content.replace(targetEN, replacementEN);

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
