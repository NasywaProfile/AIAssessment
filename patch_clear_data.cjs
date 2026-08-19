const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// 1. Add Trash2 icon
content = content.replace(
  "import { LogOut, Users, BarChart3, Building2, TrendingUp, Search, Filter, RefreshCcw, ArrowUpRight, ChevronDown, ChevronUp, Download, FileSpreadsheet } from 'lucide-react';",
  "import { LogOut, Users, BarChart3, Building2, TrendingUp, Search, Filter, RefreshCcw, ArrowUpRight, ChevronDown, ChevronUp, Download, FileSpreadsheet, Trash2 } from 'lucide-react';"
);

// 2. Add handleClearData function
const handleClearDataFunc = `
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all submissions data? This cannot be undone.')) {
      localStorage.removeItem('nortis_submissions');
      setSubmissions([]);
    }
  };

  const handleExportCSV = () => {`;

content = content.replace(
  "const handleExportCSV = () => {",
  handleClearDataFunc
);

// 3. Add button in UI, next to the Refresh button or Export button
const exportButtons = `<button onClick={handleExportExcel} className="flex items-center gap-2 px-3.5 py-2 bg-[#0e9f6e] hover:bg-[#057a55] text-white rounded-lg transition-colors font-medium text-sm">
                <FileSpreadsheet className="w-4 h-4" />
                <span>{t("admin.exportExcel")}</span>
              </button>`;

const newButtons = `<button onClick={handleExportExcel} className="flex items-center gap-2 px-3.5 py-2 bg-[#0e9f6e] hover:bg-[#057a55] text-white rounded-lg transition-colors font-medium text-sm">
                <FileSpreadsheet className="w-4 h-4" />
                <span>{t("admin.exportExcel")}</span>
              </button>
              <button onClick={handleClearData} className="flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm" title="Clear All Data">
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear Data</span>
              </button>`;

content = content.replace(exportButtons, newButtons);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
console.log("Patched AdminDashboard to add Clear Data button.");
