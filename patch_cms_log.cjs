const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');
content = content.replace(
  "const renderFields = (idObj: any, enObj: any, section: string, path: string[] = []) => {",
  "const renderFields = (idObj: any, enObj: any, section: string, path: string[] = []) => {\n    console.log('Rendering fields for:', section, path, idObj);"
);
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
