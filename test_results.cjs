const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');
content = content.replace(
  "{activeTab !== 'images' && draftTranslations['ID'][activeTab] && (",
  "{activeTab !== 'images' && draftTranslations['ID'] && draftTranslations['ID'][activeTab] && ("
);
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
