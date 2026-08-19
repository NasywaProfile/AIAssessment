const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

if (!content.includes('Globe,')) {
  content = content.replace("import { LogOut", "import { LogOut, Globe");
}
fs.writeFileSync('src/components/AdminDashboard.tsx', content);
