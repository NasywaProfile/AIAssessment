const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Fix button container wrapping
content = content.replace(
  '<div className="flex items-center gap-2.5 w-full sm:w-auto">',
  '<div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">'
);

// Make Export CSV responsive
content = content.replace(
  '<button onClick={handleExportCSV} className="flex items-center gap-2 px-3.5 py-2 bg-[#039845] hover:bg-[#02843b] text-white rounded-lg transition-colors font-medium text-sm">',
  '<button onClick={handleExportCSV} className="flex items-center justify-center gap-2 px-3.5 py-2 bg-[#039845] hover:bg-[#02843b] text-white rounded-lg transition-colors font-medium text-sm flex-1 sm:flex-none">'
);

// Make Export Excel responsive
content = content.replace(
  '<button onClick={handleExportExcel} className="flex items-center gap-2 px-3.5 py-2 bg-[#0e9f6e] hover:bg-[#057a55] text-white rounded-lg transition-colors font-medium text-sm">',
  '<button onClick={handleExportExcel} className="flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0e9f6e] hover:bg-[#057a55] text-white rounded-lg transition-colors font-medium text-sm flex-1 sm:flex-none">'
);

// Make Clear Data responsive
content = content.replace(
  '<button onClick={handleClearData} className="flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm" title="Clear All Data">',
  '<button onClick={handleClearData} className="flex items-center justify-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm flex-1 sm:flex-none" title="Clear All Data">'
);

// Make Refresh button responsive
content = content.replace(
  '<button className="flex items-center justify-center p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-800">',
  '<button onClick={() => window.location.reload()} className="flex items-center justify-center p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-800 flex-1 sm:flex-none">'
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
