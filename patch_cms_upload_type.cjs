const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');
content = content.replace(
  "setDraftImages({ ...draftImages, logo: reader.result });",
  "setDraftImages({ ...draftImages, logo: reader.result as string });"
);
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
