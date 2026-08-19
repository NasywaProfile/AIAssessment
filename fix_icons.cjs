const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

content = content.replace(
  "LayoutTemplate, FileText, HelpCircle,",
  "LayoutTemplate, FileText, HelpCircle, ListTodo,"
);

content = content.replace(
  "{ id: 'assessmentData', label: 'Assessment Questions', icon: FileText,",
  "{ id: 'assessmentData', label: 'Assessment Questions', icon: ListTodo,"
);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
