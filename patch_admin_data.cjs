const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Imports
content = content.replace(
  "import { useLanguage } from '../contexts/LanguageContext';",
  "import { useLanguage } from '../contexts/LanguageContext';\nimport { useEffect, useState as useStateReact } from 'react';\nimport * as XLSX from 'xlsx';\nimport { AssessmentSubmission } from '../types';"
);

// We already have `useState`, let's just make sure we don't conflict, wait we just imported useStateReact. Actually `import React, { useState } from 'react';` is already there. So I'll remove my useStateReact.

content = content.replace(
  "import { useEffect, useState as useStateReact } from 'react';",
  "import { useEffect } from 'react';"
);

// Add submissions state
content = content.replace(
  "const [showFilters, setShowFilters] = useState(false);",
  "const [showFilters, setShowFilters] = useState(false);\n  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);\n\n  useEffect(() => {\n    const existing = JSON.parse(localStorage.getItem('nortis_submissions') || '[]');\n    setSubmissions(existing);\n  }, []);"
);

const exportCode = `
  const getExportData = () => {
    return submissions.map(s => ({
      ID: s.id,
      Timestamp: s.timestamp,
      'Company Name': s.companyName,
      Industry: s.industry,
      'Company Size': s.companySize,
      Location: s.location,
      'AI Objective': s.aiGoal,
      'AI Use Cases': s.aiUseCase,
      Timeline: s.timeline,
      'PIC Name': s.fullName,
      'PIC Position': s.jobTitle,
      'PIC Email': s.email,
      'PIC Phone': s.phone,
      'Overall Score': s.overallScore.toFixed(2),
      'Strategy & Leadership': s.scores.strategi.toFixed(2),
      'Process & Workflow': s.scores.proses.toFixed(2),
      'People & Capability': s.scores.sdm.toFixed(2),
      'Data & Technology': s.scores.data.toFixed(2),
      'Governance & Responsible AI': s.scores.tataKelola.toFixed(2),
      'Readiness Level': s.readinessLevel,
      'Readiness Description': s.readinessDescription
    }));
  };

  const handleExportCSV = () => {
    const data = getExportData();
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'nortis_submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const data = getExportData();
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
    XLSX.writeFile(workbook, 'nortis_submissions.xlsx');
  };
`;

content = content.replace(
  "const { t } = useLanguage();",
  "const { t } = useLanguage();\n" + exportCode
);

// Wire up the buttons
content = content.replace(
  /<button className="flex items-center gap-2 px-3\.5 py-2 bg-\[#039845\] hover:bg-\[#02843b\] text-white rounded-lg transition-colors font-medium text-sm">/g,
  '<button onClick={handleExportCSV} className="flex items-center gap-2 px-3.5 py-2 bg-[#039845] hover:bg-[#02843b] text-white rounded-lg transition-colors font-medium text-sm">'
);

content = content.replace(
  /<button className="flex items-center gap-2 px-3\.5 py-2 bg-\[#0e9f6e\] hover:bg-\[#057a55\] text-white rounded-lg transition-colors font-medium text-sm">/g,
  '<button onClick={handleExportExcel} className="flex items-center gap-2 px-3.5 py-2 bg-[#0e9f6e] hover:bg-[#057a55] text-white rounded-lg transition-colors font-medium text-sm">'
);

// Update stats
content = content.replace(
  /<span className="text-\[28px\] font-bold leading-none text-slate-800">0<\/span>/,
  '<span className="text-[28px] font-bold leading-none text-slate-800">{submissions.length}</span>'
);

content = content.replace(
  /<span className="text-\[28px\] font-bold leading-none text-slate-800">0\.0<\/span>/,
  '<span className="text-[28px] font-bold leading-none text-slate-800">{submissions.length > 0 ? (submissions.reduce((a, b) => a + b.overallScore, 0) / submissions.length).toFixed(1) : "0.0"}</span>'
);

content = content.replace(
  /<span className="text-\[28px\] font-bold leading-none text-slate-800">0<\/span>/,
  '<span className="text-[28px] font-bold leading-none text-slate-800">{new Set(submissions.map(s => s.industry)).size}</span>'
);

content = content.replace(
  /<span className="text-\[28px\] font-bold leading-none text-slate-800">0<\/span>/,
  '<span className="text-[28px] font-bold leading-none text-slate-800">{submissions.filter(s => s.overallScore > 3.5).length}</span>'
);

content = content.replace(
  /<p className="text-sm text-slate-700">\{t\("admin\.showing"\)\} <span className="font-medium">0<\/span> \{t\("admin\.of"\)\} <span className="font-medium">0<\/span> \{t\("admin\.submissions"\)\}<\/p>/,
  '<p className="text-sm text-slate-700">{t("admin.showing")} <span className="font-medium">{submissions.length}</span> {t("admin.of")} <span className="font-medium">{submissions.length}</span> {t("admin.submissions")}</p>'
);

const renderList = `
          {submissions.length === 0 ? (
            <div className="border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-white min-h-[300px]">
              <Users2 className="w-10 h-10 text-slate-300 mb-4 stroke-[1.5]" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">{t("admin.noSubmissions")}</h3>
              <p className="text-sm text-slate-500">{t("admin.noSubmissionsDesc")}</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="p-4 whitespace-nowrap">Company</th>
                      <th className="p-4 whitespace-nowrap">Contact</th>
                      <th className="p-4 whitespace-nowrap">Industry</th>
                      <th className="p-4 whitespace-nowrap">Score</th>
                      <th className="p-4 whitespace-nowrap">Level</th>
                      <th className="p-4 whitespace-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-slate-900">{sub.companyName}</div>
                          <div className="text-slate-500 text-xs">{sub.location}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-slate-800">{sub.fullName}</div>
                          <div className="text-slate-500 text-xs">{sub.email}</div>
                        </td>
                        <td className="p-4 text-slate-600 capitalize">{sub.industry}</td>
                        <td className="p-4">
                          <div className="inline-flex items-center justify-center px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold">
                            {sub.overallScore.toFixed(1)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-800 font-medium truncate max-w-[150px]" title={sub.readinessLevel}>
                            {sub.readinessLevel}
                          </div>
                        </td>
                        <td className="p-4 text-slate-500 text-xs">
                          {new Date(sub.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
`;

content = content.replace(
  /<div className="border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-white min-h-\[300px\]">[\s\S]*?<\/div>/,
  renderList
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
console.log('patched admin dashboard');
