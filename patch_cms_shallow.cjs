const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

content = content.replace(
  "const newDraft = { ...draftTranslations };",
  "const newDraft = JSON.parse(JSON.stringify(draftTranslations));"
);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
