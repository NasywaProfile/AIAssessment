const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

content = content.replace(
  "const [activeTab, setActiveTab] = useState<string>('images');",
  "const [activeTab, setActiveTab] = useState<string>('landing_flow');"
);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
