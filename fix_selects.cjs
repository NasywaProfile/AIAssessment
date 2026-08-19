const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// The script replaced BOTH selects with `filterLevel`. 
// I need to find the one for industry and change it to filterIndustry.
const levelSelect = '<select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors text-sm appearance-none">';
const indSelect = '<select value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)} className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors text-sm appearance-none">';

// There should be two occurrences of levelSelect now. The second one should be indSelect.
let parts = content.split(levelSelect);
if (parts.length === 3) {
  content = parts[0] + levelSelect + parts[1] + indSelect + parts[2];
}

// Ensure submissions is replaced with filteredSubmissions in the UI
content = content.replace(
  /{submissions\.length === 0 \? \(/,
  "{filteredSubmissions.length === 0 ? ("
);

content = content.replace(
  /\{submissions\.map\(\(sub\) => \(/,
  "{filteredSubmissions.map((sub) => ("
);

// We should also ensure stats show the right number or we keep stats showing overall, but the list showing filtered.
// "admin.showing x of y submissions"
content = content.replace(
  /<span className="font-medium">\{submissions\.length\}<\/span> \{t\("admin\.of"\)\} <span className="font-medium">\{submissions\.length\}<\/span>/,
  '<span className="font-medium">{filteredSubmissions.length}</span> {t("admin.of")} <span className="font-medium">{submissions.length}</span>'
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
console.log('fixed selects');
