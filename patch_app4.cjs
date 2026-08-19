const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace("  return (\n    <LanguageProvider>", "  }\n\n  return (\n    <LanguageProvider>");
fs.writeFileSync('src/App.tsx', content);
