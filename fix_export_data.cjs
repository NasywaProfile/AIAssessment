const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

content = content.replace(
  "return submissions.map(s => ({",
  "return filteredSubmissions.map(s => ({"
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
console.log('fixed export to use filtered data');
