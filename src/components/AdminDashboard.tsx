import React, { useState } from 'react';
import { LogOut, Globe, Users, BarChart3, Building2, TrendingUp, Search, Filter, RefreshCcw, ArrowUpRight, ChevronDown, ChevronUp, Download, FileSpreadsheet, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { AssessmentSubmission } from '../types';
import { apiService } from '../services/api';

interface AdminDashboardProps {
  onLogout: () => void;
  onOpenCMS?: () => void;
}

export function AdminDashboard({ onLogout, onOpenCMS }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);

  const loadData = () => {
    apiService.getSubmissions().then(data => {
      setSubmissions(data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  const { t, language, translations } = useLanguage();

  const filteredSubmissions = submissions.filter(sub => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      sub.companyName.toLowerCase().includes(searchLower) ||
      sub.fullName.toLowerCase().includes(searchLower) ||
      sub.email.toLowerCase().includes(searchLower) ||
      (t(`form.industries.${sub.industry}`) || sub.industry).toLowerCase().includes(searchLower);

    const matchesLevel = !filterLevel || sub.readinessLevel === filterLevel;
    const matchesIndustry = !filterIndustry || sub.industry.toLowerCase() === filterIndustry.toLowerCase();

    return matchesSearch && matchesLevel && matchesIndustry;
  });


  const getTimelineLabel = (value: string) => {
    const map: Record<string, string> = {
      '0-3m': 'm3',
      '3-6m': 'm6',
      '6-12m': 'm12',
      '12m+': 'mplus',
      'none': 'none'
    };
    const key = map[value];
    if (key) {
      const translated = t(`form.timelines.${key}`);
      return translated !== `form.timelines.${key}` ? translated : value;
    }
    return value;
  };

  const getExportData = () => {
    return filteredSubmissions.map((s, index) => ({
      No: index + 1,
      Timestamp: s.timestamp,
      'Company Name': s.companyName,
      Industry: (t(`form.industries.${s.industry}`) && t(`form.industries.${s.industry}`) !== `form.industries.${s.industry}`) ? t(`form.industries.${s.industry}`) : s.industry,
      'Company Size': s.companySize,
      Location: s.location,
      'AI Objective': s.aiGoal,
      'AI Use Cases': s.aiUseCase,
      Timeline: getTimelineLabel(s.timeline),
      'PIC Name': s.fullName,
      'PIC Position': s.jobTitle,
      'PIC Email': s.email,
      'PIC Phone': s.phone,
      'Overall Score': s.overallScore.toFixed(2),
      [translations[language].assessmentData[0]?.shortTitle || 'Strategy & Leadership']: s.scores.strategi.toFixed(2),
      [translations[language].assessmentData[1]?.shortTitle || 'Process & Workflow']: s.scores.proses.toFixed(2),
      'People & Capability': s.scores.sdm.toFixed(2),
      [translations[language].assessmentData[3]?.shortTitle || 'Data & Technology']: s.scores.data.toFixed(2),
      'Governance & Responsible AI': s.scores.tataKelola.toFixed(2),
      'Readiness Level': s.readinessLevel,
      'Readiness Description': s.readinessDescription
    }));
  };

  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all submissions data? This cannot be undone.')) {
      localStorage.removeItem('nortis_submissions');
      setSubmissions([]);
    }
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

  
  const handleExportExcel = async () => {
    const data = getExportData();
    if (data.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Submissions');

    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      worksheet.columns = headers.map(header => ({
        header: header,
        key: header,
        width: 20
      }));

      worksheet.addRows(data);

      worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2;
      });

      const headerRow = worksheet.getRow(1);
      headerRow.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF0e9f6e' }
        };
        cell.font = {
          color: { argb: 'FFFFFFFF' },
          bold: true
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
      headerRow.height = 25;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'nortis_submissions.xlsx');
  };



  const recentSubmissionsCount = submissions.filter(s => new Date(s.timestamp) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans p-4 md:px-8 md:pt-4 md:pb-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{t("admin.dashboardTitle")}</h1>
            <p className="text-[13px] text-slate-500 mt-1">{t("admin.dashboardSubtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenCMS}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors font-medium text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>Manage Content</span>
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors font-medium text-sm w-fit"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t("admin.logout")}</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Submissions */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[150px]">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-[28px] font-bold leading-none text-slate-800">{submissions.length}</span>
            </div>
            <div>
              <p className="text-[14px] font-medium text-slate-600 mb-1.5">{t("admin.totalSubmissions")}</p>
              <div className="flex items-center gap-1.5 text-emerald-600 text-[13px] font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                <span>{recentSubmissionsCount} {t("admin.last7Days")}</span>
              </div>
            </div>
          </div>

          {/* Avg Overall Score */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[150px]">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#8b5cf6]" />
              </div>
              <span className="text-[28px] font-bold leading-none text-slate-800">{submissions.length > 0 ? (submissions.reduce((a, b) => a + b.overallScore, 0) / submissions.length).toFixed(1) : "0.0"}</span>
            </div>
            <div>
              <p className="text-[14px] font-medium text-slate-600 mb-1.5">{t("admin.avgScore")}</p>
              <p className="text-[13px] text-slate-400">{t("admin.outOf5")}</p>
            </div>
          </div>

          {/* Industries */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[150px]">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#3b82f6]" />
              </div>
              <span className="text-[28px] font-bold leading-none text-slate-800">{new Set(submissions.map(s => s.industry)).size}</span>
            </div>
            <div>
              <p className="text-[14px] font-medium text-slate-600 mb-1.5">{t("admin.industries")}</p>
              <p className="text-[13px] text-slate-400">{t("admin.differentSectors")}</p>
            </div>
          </div>

          {/* AI Mature Orgs */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[150px]">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#f97316]" />
              </div>
              <span className="text-[28px] font-bold leading-none text-slate-800">{submissions.filter(s => s.overallScore > 3.5).length}</span>
            </div>
            <div>
              <p className="text-[14px] font-medium text-slate-600 mb-1.5">{t("admin.aiMature")}</p>
              <p className="text-[13px] text-slate-400">{t("admin.topPerformers")}</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col mt-4">
          <div className="p-3 flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder={t("admin.searchPlaceholder")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors text-sm placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-between gap-2 px-3.5 py-2 border rounded-lg transition-colors font-medium text-sm flex-1 sm:flex-none min-w-[100px] ${showFilters ? 'bg-slate-50 border-slate-300 text-slate-800' : 'border-slate-300 hover:bg-slate-50 text-slate-800'}`}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{t("admin.filters")}</span>
                </div>
                {showFilters ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
              </button>
              <button onClick={handleExportCSV} className="flex items-center justify-center gap-2 px-3.5 py-2 bg-[#039845] hover:bg-[#02843b] text-white rounded-lg transition-colors font-medium text-sm flex-1 sm:flex-none">
                <Download className="w-4 h-4" />
                <span>{t("admin.exportCsv")}</span>
              </button>
              <button onClick={handleExportExcel} className="flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0e9f6e] hover:bg-[#057a55] text-white rounded-lg transition-colors font-medium text-sm flex-1 sm:flex-none">
                <FileSpreadsheet className="w-4 h-4" />
                <span>{t("admin.exportExcel")}</span>
              </button>
              
              <button onClick={() => window.location.reload()} className="flex items-center justify-center p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-800 flex-1 sm:flex-none">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row gap-5">
              <div className="flex-1 relative">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{t("admin.readinessLevel")}</label>
                <select 
                  value={filterLevel} 
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors text-sm appearance-none"
                >
                  <option value="">{t("admin.allLevels")}</option>
                  <option value="AI-Unready">{t("admin.level1")}</option>
                  <option value="AI-Aware">{t("admin.level2")}</option>
                  <option value="AI-Ready">{t("admin.level3")}</option>
                  <option value="AI-Enabled">{t("admin.level4")}</option>
                  <option value="AI-Mature">{t("admin.level5")}</option>
                </select>
                <ChevronDown className="absolute right-3.5 bottom-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
              <div className="flex-1 relative">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">{t("admin.industryLabel")}</label>
                <select 
                  value={filterIndustry} 
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors text-sm appearance-none"
                >
                  <option value="">{t("admin.allIndustries")}</option>
                  {Object.entries(translations[language].form.industries || {}).map(([key, label]) => (
                    <option key={key} value={key}>{label as string}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 bottom-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* List Area */}
        <div className="space-y-4 pt-2">
          <p className="text-sm text-slate-700">{t("admin.showing")} <span className="font-medium">{filteredSubmissions.length}</span> {t("admin.of")} <span className="font-medium">{submissions.length}</span> {t("admin.submissions")}</p>
          
          
          {filteredSubmissions.length === 0 ? (
            <div className="border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-white min-h-[300px]">
              <Users className="w-10 h-10 text-slate-300 mb-4 stroke-[1.5]" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">{t("admin.noSubmissions")}</h3>
              <p className="text-sm text-slate-500">{t("admin.noSubmissionsDesc")}</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="p-4 whitespace-nowrap w-[18%]">Company</th>
                      <th className="p-4 whitespace-nowrap w-[18%]">Contact</th>
                      <th className="p-4 whitespace-nowrap w-[14%]">Industry</th>
                      <th className="p-4 whitespace-nowrap w-[10%]">Score</th>
                      <th className="p-4 whitespace-nowrap w-[18%]">Level</th>
                      <th className="p-4 whitespace-nowrap w-[12%]">Date</th>
                      <th className="p-4 whitespace-nowrap w-[10%] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-slate-900 truncate pr-2">{sub.companyName}</div>
                          <div className="text-slate-500 text-xs truncate pr-2">{sub.location}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-slate-800 truncate pr-2">{sub.fullName}</div>
                          <div className="text-slate-500 text-xs truncate pr-2">{sub.email}</div>
                        </td>
                        <td className="p-4 text-slate-600 truncate pr-2" title={t(`form.industries.${sub.industry}`) || sub.industry}>{t(`form.industries.${sub.industry}`) || sub.industry}</td>
                        <td className="p-4">
                          <div className="inline-flex items-center justify-center px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold">
                            {sub.overallScore.toFixed(1)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-800 font-medium truncate pr-2" title={sub.readinessLevel}>
                            {sub.readinessLevel}
                          </div>
                        </td>
                        <td className="p-4 text-slate-500 text-xs">
                          {new Date(sub.timestamp).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => {
                              if (confirm('Hapus submission ini dari database?')) {
                                apiService.deleteSubmission(sub.id).then(() => loadData());
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Hapus Submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
