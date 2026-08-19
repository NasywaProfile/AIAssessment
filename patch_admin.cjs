const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

content = content.replace("import { useLanguage } from '../contexts/LanguageContext';", "import { useLanguage } from '../contexts/LanguageContext';"); // ensure it's there
// oh wait, does AdminDashboard have `language` and `translations`?
// Let's check `AdminDashboard.tsx`
