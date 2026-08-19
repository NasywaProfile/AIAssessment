const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Update getExportData to use sequential index instead of string ID
content = content.replace(
  "return filteredSubmissions.map(s => ({",
  "return filteredSubmissions.map((s, index) => ({"
);
content = content.replace(
  "ID: s.id,",
  "No: index + 1,"
);

// Remove the clear data button
const clearBtnRegex = /<button onClick=\{handleClearData\}[\s\S]*?<\/button>/;
content = content.replace(clearBtnRegex, "");

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
