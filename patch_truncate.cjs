const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Ensure truncate works properly on table cells
content = content.replace(
  '<div className="font-medium text-slate-900">{sub.companyName}</div>',
  '<div className="font-medium text-slate-900 truncate pr-2">{sub.companyName}</div>'
);
content = content.replace(
  '<div className="text-slate-500 text-xs">{sub.location}</div>',
  '<div className="text-slate-500 text-xs truncate pr-2">{sub.location}</div>'
);
content = content.replace(
  '<div className="font-medium text-slate-800">{sub.fullName}</div>',
  '<div className="font-medium text-slate-800 truncate pr-2">{sub.fullName}</div>'
);
content = content.replace(
  '<div className="text-slate-500 text-xs">{sub.email}</div>',
  '<div className="text-slate-500 text-xs truncate pr-2">{sub.email}</div>'
);
content = content.replace(
  '<td className="p-4 text-slate-600">{t(`form.industries.${sub.industry}`) || sub.industry}</td>',
  '<td className="p-4 text-slate-600 truncate pr-2" title={t(`form.industries.${sub.industry}`) || sub.industry}>{t(`form.industries.${sub.industry}`) || sub.industry}</td>'
);
content = content.replace(
  '<div className="text-slate-800 font-medium truncate max-w-[150px]" title={sub.readinessLevel}>',
  '<div className="text-slate-800 font-medium truncate pr-2" title={sub.readinessLevel}>'
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
