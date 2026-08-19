const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Fix duplicate Users import
content = content.replace(
  "import { LogOut, Users, BarChart3, Building2, TrendingUp, Search, Filter, RefreshCcw, Users, ArrowUpRight, ChevronDown, ChevronUp, Download, FileSpreadsheet } from 'lucide-react';",
  "import { LogOut, Users, BarChart3, Building2, TrendingUp, Search, Filter, RefreshCcw, ArrowUpRight, ChevronDown, ChevronUp, Download, FileSpreadsheet } from 'lucide-react';"
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
