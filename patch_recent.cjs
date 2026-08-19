const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const calcString = `const recentSubmissionsCount = submissions.filter(s => new Date(s.timestamp) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;`;

// Insert the calculation right before return
content = content.replace(
  "return (",
  calcString + "\n\n  return ("
);

// Replace the hardcoded 0
content = content.replace(
  '<span>0 {t("admin.last7Days")}</span>',
  '<span>{recentSubmissionsCount} {t("admin.last7Days")}</span>'
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
