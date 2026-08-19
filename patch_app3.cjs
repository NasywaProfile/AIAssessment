const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace("  } />\n      </LanguageProvider>\n    );\n  }", "");
fs.writeFileSync('src/App.tsx', content);
