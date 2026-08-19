const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Replace table class to include table-fixed
content = content.replace(
  '<table className="w-full text-left border-collapse">',
  '<table className="w-full text-left border-collapse table-fixed min-w-[800px]">'
);

// Add width to th elements
content = content.replace(
  '<th className="p-4 whitespace-nowrap">Company</th>',
  '<th className="p-4 whitespace-nowrap w-[22%]">Company</th>'
);
content = content.replace(
  '<th className="p-4 whitespace-nowrap">Contact</th>',
  '<th className="p-4 whitespace-nowrap w-[22%]">Contact</th>'
);
content = content.replace(
  '<th className="p-4 whitespace-nowrap">Industry</th>',
  '<th className="p-4 whitespace-nowrap w-[15%]">Industry</th>'
);
content = content.replace(
  '<th className="p-4 whitespace-nowrap">Score</th>',
  '<th className="p-4 whitespace-nowrap w-[10%]">Score</th>'
);
content = content.replace(
  '<th className="p-4 whitespace-nowrap">Level</th>',
  '<th className="p-4 whitespace-nowrap w-[21%]">Level</th>'
);
content = content.replace(
  '<th className="p-4 whitespace-nowrap">Date</th>',
  '<th className="p-4 whitespace-nowrap w-[10%]">Date</th>'
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
