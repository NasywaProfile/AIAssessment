const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');
content = content.replace("{ id: 'results', label: 'Assessment Results' }", "{ id: 'result', label: 'Assessment Results' }");
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
