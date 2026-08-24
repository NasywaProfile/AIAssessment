import React, { useState } from 'react';
import { useLanguage, defaultTranslations } from '../../contexts/LanguageContext';
import { Save, Image as ImageIcon, LayoutTemplate, FileText, HelpCircle, ListTodo, CheckCircle, Upload, CheckCircle2, RefreshCcw, LogOut, AlertCircle, Menu, X } from 'lucide-react';

import { apiService } from '../../services/api';

const humanize = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function CMSDashboard({ onBack }: { onBack: () => void }) {
  const { translations, updateTranslations, images, updateImage } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('landing_flow');
  const [draftTranslations, setDraftTranslations] = useState<any>(JSON.parse(JSON.stringify(translations)));
  const [draftImages, setDraftImages] = useState<Record<string, string>>({ ...images });
  const [isSaved, setIsSaved] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'landing_flow', label: 'Landing Page', icon: LayoutTemplate, desc: 'Logo & Homepage Content' },
    { id: 'assessment_flow', label: 'Assessment Page', icon: ListTodo, desc: 'Form, Questions & Scale' },
    { id: 'result_flow', label: 'Results Page', icon: CheckCircle, desc: 'Completion text & summary' },
    { id: 'admin_flow', label: 'Admin Page', icon: AlertCircle, desc: 'Admin login & settings' }
  ];

  const handleSave = () => {
    updateTranslations(draftTranslations);
    Object.entries(draftImages).forEach(([key, url]) => {
      updateImage(key, url);
    });

    apiService.saveCMSData({
      questions: draftTranslations.ID?.assessmentData?.[0]?.questions || [],
      categories: draftTranslations.ID?.assessmentData?.map((a: any) => ({ id: a.id, title: a.title, icon: a.icon, description: a.description })) || [],
      industries: draftTranslations.ID?.form?.industries ? Object.values(draftTranslations.ID.form.industries) : [],
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content to default? This will wipe your custom translations and images.')) {
      setDraftTranslations(JSON.parse(JSON.stringify(defaultTranslations)));
      setDraftImages({ logo: '/LogoNortis.png' });
    }
  };

  const updateDraftText = (lang: 'ID' | 'EN', section: string, path: string[], value: any) => {
    const newDraft = JSON.parse(JSON.stringify(draftTranslations));
    let current = newDraft[lang][section];
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setDraftTranslations(newDraft);
  };

  
  const handleAddOption = (section: string, path: string[]) => {
    const newKey = window.prompt("Masukkan ID unik untuk opsi baru (tanpa spasi, huruf kecil, contoh: 'education'):");
    if (!newKey) return;
    const newKeyClean = newKey.replace(/\s+/g, '').toLowerCase();
    
    const newDraft = JSON.parse(JSON.stringify(draftTranslations));
    let currentID = newDraft['ID'][section];
    let currentEN = newDraft['EN'][section];
    for (let i = 0; i < path.length; i++) {
      currentID = currentID[path[i]];
      currentEN = currentEN[path[i]];
    }
    
    if (currentID[newKeyClean] !== undefined) {
      alert("ID tersebut sudah ada.");
      return;
    }
    
    currentID[newKeyClean] = newKeyClean;
    if (currentEN) currentEN[newKeyClean] = newKeyClean;
    setDraftTranslations(newDraft);
  };

  const handleRemoveOption = (section: string, path: string[], keyToRemove: string) => {
    if (!window.confirm(`Hapus opsi '${keyToRemove}'?`)) return;
    const newDraft = JSON.parse(JSON.stringify(draftTranslations));
    let currentID = newDraft['ID'][section];
    let currentEN = newDraft['EN'][section];
    for (let i = 0; i < path.length; i++) {
      currentID = currentID[path[i]];
      currentEN = currentEN?.[path[i]];
    }
    delete currentID[keyToRemove];
    if (currentEN) delete currentEN[keyToRemove];
    setDraftTranslations(newDraft);
  };

  const renderInputField = (lang: 'ID' | 'EN', section: string, path: string[], value: string, label: string) => {
    const isTextArea = value.length > 60 || path[path.length - 1].toLowerCase().includes('desc');
    return (
      <div className="flex-1">
        <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{lang === 'ID' ? 'Bahasa Indonesia' : 'English'}</label>
        {isTextArea ? (
          <textarea 
            className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[13px] min-h-[90px] focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
            value={value}
            onChange={(e) => updateDraftText(lang, section, path, e.target.value)}
          />
        ) : (
          <input 
            type="text" 
            className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50/50 rounded-xl text-[13px] focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
            value={value}
            onChange={(e) => updateDraftText(lang, section, path, e.target.value)}
          />
        )}
      </div>
    );
  };

  const renderFieldGroup = (section: string, path: string[], valID: any, valEN: any, titleOverride?: string) => {
    const title = titleOverride || humanize(path[path.length - 1]);
    
    // Array of Strings (like benefits or instructions)
    if (Array.isArray(valID) && typeof valID[0] === 'string') {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
            <div className="flex gap-2 items-center">
              <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">List items</span>
              <button 
                onClick={() => {
                  const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                  let currentID = newDraft['ID'][section];
                  let currentEN = newDraft['EN'][section];
                  for (let i = 0; i < path.length; i++) {
                    currentID = currentID[path[i]];
                    currentEN = currentEN[path[i]];
                  }
                  currentID.push('New item');
                  if (currentEN) currentEN.push('New item');
                  setDraftTranslations(newDraft);
                }}
                className="text-xs px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors font-semibold"
              >
                + Tambah Item
              </button>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {valID.map((item: string, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row gap-5 p-5 bg-white rounded-xl border border-slate-100 shadow-sm relative group">
                <div className="flex-none flex flex-col gap-3 items-center">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold border border-emerald-100">{idx + 1}</div>
                  <button 
                    onClick={() => {
                      if (!window.confirm('Hapus item ini?')) return;
                      const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                      let currentID = newDraft['ID'][section];
                      let currentEN = newDraft['EN'][section];
                      for (let i = 0; i < path.length; i++) {
                        currentID = currentID[path[i]];
                        currentEN = currentEN?.[path[i]];
                      }
                      currentID.splice(idx, 1);
                      if (currentEN) currentEN.splice(idx, 1);
                      setDraftTranslations(newDraft);
                    }}
                    className="text-[10px] text-red-500 hover:text-red-600 font-bold"
                  >
                    Hapus
                  </button>
                </div>
                <div className="flex-1 flex flex-col md:flex-row gap-5">
                  {renderInputField('ID', section, [...path, idx.toString()], item, 'ID')}
                  {renderInputField('EN', section, [...path, idx.toString()], valEN?.[idx] || '', 'EN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Array of Objects (like scale: [{score: 0, label: ''}])
    if (Array.isArray(valID) && typeof valID[0] === 'object') {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
            <button
              onClick={() => {
                const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                let currentID = newDraft['ID'][section];
                let currentEN = newDraft['EN'][section];
                for (let i = 0; i < path.length; i++) {
                  currentID = currentID[path[i]];
                  currentEN = currentEN[path[i]];
                }
                const newScore = currentID.length;
                currentID.push({ score: newScore, label: 'New label' });
                if (currentEN) currentEN.push({ score: newScore, label: 'New label' });
                setDraftTranslations(newDraft);
              }}
              className="text-xs px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors font-semibold"
            >
              + Tambah Skala
            </button>
          </div>
          <div className="p-5 space-y-4">
            {valID.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row gap-5 items-start p-5 bg-white rounded-xl border border-slate-100 shadow-sm relative group">
                <div className="flex-none flex flex-col gap-2">
                  <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold border border-emerald-100 text-center">
                    Score: {item.score}
                  </div>
                  <button
                    onClick={() => {
                      if (!window.confirm('Hapus skala ini?')) return;
                      const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                      let currentID = newDraft['ID'][section];
                      let currentEN = newDraft['EN'][section];
                      for (let i = 0; i < path.length; i++) {
                        currentID = currentID[path[i]];
                        currentEN = currentEN?.[path[i]];
                      }
                      currentID.splice(idx, 1);
                      if (currentEN) currentEN.splice(idx, 1);
                      
                      // Recalculate scores to be sequential
                      currentID.forEach((s: any, i: number) => s.score = i);
                      if (currentEN) currentEN.forEach((s: any, i: number) => s.score = i);
                      
                      setDraftTranslations(newDraft);
                    }}
                    className="text-[10px] text-red-500 hover:text-red-600 font-bold text-center mt-1"
                  >
                    Hapus
                  </button>
                </div>
                <div className="flex-1 flex flex-col md:flex-row gap-5 w-full">
                  {renderInputField('ID', section, [...path, idx.toString(), 'label'], item.label, 'ID')}
                  {renderInputField('EN', section, [...path, idx.toString(), 'label'], valEN?.[idx]?.label || '', 'EN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Standard String Field
    if (typeof valID === 'string') {
      return (
        <div key={path.join('.')} className="mb-4 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:border-emerald-200 transition-colors">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
          </div>
          <div className="p-5 flex flex-col md:flex-row gap-5">
            {renderInputField('ID', section, path, valID, 'ID')}
            {renderInputField('EN', section, path, valEN || '', 'EN')}
          </div>
        </div>
      );
    }

    // Nested Object (like industries, pillars, companySizes)
    if (typeof valID === 'object' && valID !== null) {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
          </div>
          <div className="p-5 grid grid-cols-1 gap-4">
            {Object.keys(valID).map(key => (
               <div key={key} className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                 <div className="flex-1 flex flex-col md:flex-row gap-5">
                   {renderInputField('ID', section, [...path, key], valID[key], 'ID')}
                   {renderInputField('EN', section, [...path, key], valEN?.[key] || '', 'EN')}
                 </div>
               </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderSection = (sectionId: string) => {
    let idData = draftTranslations['ID'][sectionId];
    let enData = draftTranslations['EN'][sectionId];
    
    // Only render fields that exist in defaultTranslations
    const defaultIdData = defaultTranslations['ID'][sectionId as keyof typeof defaultTranslations['ID']];
    if (idData && defaultIdData) {
      const filteredIdData: any = {};
      Object.keys(defaultIdData).forEach(key => {
        if (idData[key] !== undefined) {
          filteredIdData[key] = idData[key];
        }
      });
      
      // Exclusions based on requests
      if (sectionId === 'questions') {
        delete filteredIdData['pillarIndicator']; // hide legacy field
      }
      if (sectionId === 'form') {
        delete filteredIdData['dropdownPlaceholder'];
      }
      if (sectionId === 'admin') {
        delete filteredIdData['loginHeader'];
        delete filteredIdData['password'];
        delete filteredIdData['passwordPlaceholder'];
        delete filteredIdData['wrongPassword'];
        delete filteredIdData['loginBtn'];
        delete filteredIdData['backHome'];
      }

      idData = filteredIdData;
    }

    if (sectionId === 'assessmentData') {
      const idPillars = draftTranslations['ID'].assessmentData || [];
      const enPillars = draftTranslations['EN'].assessmentData || [];
      
      return (
        <div className="space-y-8">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => {
                const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                const newId = 'pillar_' + Date.now();
                const newPillarID = { id: newId, title: 'New Pillar', description: '', shortTitle: 'New Pillar', questions: [{ id: newId + '_1', text: 'New Question' }] };
                const newPillarEN = { id: newId, title: 'New Pillar', description: '', shortTitle: 'New Pillar', questions: [{ id: newId + '_1', text: 'New Question' }] };
                newDraft['ID'].assessmentData.push(newPillarID);
                newDraft['EN'].assessmentData.push(newPillarEN);
                setDraftTranslations(newDraft);
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700"
            >
              + Tambah Pillar
            </button>
          </div>
          {idPillars.map((pillar: any, pIndex: number) => (
            <div key={pIndex} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-lg">Pillar {pIndex + 1}: {pillar.title}</h3>
                <button
                  onClick={() => {
                    if (!window.confirm('Hapus pillar ini?')) return;
                    const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                    newDraft['ID'].assessmentData.splice(pIndex, 1);
                    newDraft['EN'].assessmentData.splice(pIndex, 1);
                    setDraftTranslations(newDraft);
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-bold"
                >
                  Hapus Pillar
                </button>
              </div>
              <div className="p-5 space-y-6">
                
                {/* Pillar Info */}
                <div className="space-y-4 border-b border-slate-100 pb-6">
                  <h4 className="font-semibold text-sm text-slate-700">Pillar Details</h4>

                  <div className="flex flex-col md:flex-row gap-5">
                    {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'title'], pillar.title, 'Full Title')}
                    {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'title'], enPillars[pIndex]?.title || '', 'Full Title')}
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'description'], pillar.description, 'Description')}
                    {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'description'], enPillars[pIndex]?.description || '', 'Description')}
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-sm text-slate-700">Questions</h4>
                    <button
                      onClick={() => {
                        const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                        const newQId = pillar.id + '_' + Date.now();
                        newDraft['ID'].assessmentData[pIndex].questions.push({ id: newQId, text: 'New Question' });
                        newDraft['EN'].assessmentData[pIndex].questions.push({ id: newQId, text: 'New Question' });
                        setDraftTranslations(newDraft);
                      }}
                      className="text-xs px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 font-semibold"
                    >
                      + Tambah Pertanyaan
                    </button>
                  </div>
                  <div className="space-y-4">
                    {pillar.questions.map((q: any, qIndex: number) => (
                      <div key={qIndex} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xs font-bold text-slate-500">Question {qIndex + 1} (ID: {q.id})</div>
                          <button
                            onClick={() => {
                              if (!window.confirm('Hapus pertanyaan ini?')) return;
                              const newDraft = JSON.parse(JSON.stringify(draftTranslations));
                              newDraft['ID'].assessmentData[pIndex].questions.splice(qIndex, 1);
                              newDraft['EN'].assessmentData[pIndex].questions.splice(qIndex, 1);
                              setDraftTranslations(newDraft);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 font-bold"
                          >
                            Hapus
                          </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                           {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'questions', qIndex.toString(), 'text'], q.text, 'Question text')}
                           {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'questions', qIndex.toString(), 'text'], enPillars[pIndex]?.questions[qIndex]?.text || '', 'Question text')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!idData) {
      return (
        <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 border-dashed">
          <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
          <p className="text-sm">No content fields available for this section.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {Object.keys(idData).map(key => {
          let titleOverride = undefined;
          if (sectionId === 'admin' && key === 'industryLabel') {
            titleOverride = 'Label Industri (Admin)';
          }
          if (sectionId === 'form' && key === 'industries') {
            titleOverride = 'Pilihan Industri (Sektor)';
          }
          if (sectionId === 'form' && key === 'companySizes') {
            titleOverride = 'Pilihan Ukuran Perusahaan';
          }
          if (sectionId === 'form' && key === 'timelines') {
            titleOverride = 'Pilihan Estimasi Waktu';
          }
          return renderFieldGroup(sectionId, [key], idData[key], enData?.[key], titleOverride);
        })}
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#fafafa] flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-20 md:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Light Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 shrink-0 h-full flex flex-col z-30 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              Website Content
            </h2>
            <p className="text-[13px] text-slate-500 mt-2.5">Manage text and images for your public website.</p>
          </div>
          <button 
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1.5 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-start gap-3.5 ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50 shadow-[0_2px_10px_-4px_rgba(16,185,129,0.1)]' 
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <div className="font-semibold text-[13px]">{tab.label}</div>
                  <div className={`text-[11px] mt-1 ${isActive ? 'text-emerald-600/80' : 'text-slate-400'}`}>{tab.desc}</div>
                </div>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-colors text-sm font-semibold border border-slate-200 shadow-sm"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            Exit Editor
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafafa] relative z-10">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-md px-4 md:px-8 py-4 md:py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 shadow-sm z-10 sticky top-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto ml-auto sm:ml-0">
            <button 
              onClick={handleReset}
              className="px-4 py-2 text-[13px] font-semibold text-slate-600 bg-white hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2 border border-slate-200 shadow-sm"
              title="Reset to default"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2 text-[13px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaved ? 'Saved successfully!' : 'Save Changes'}</span>
              <span className="sm:hidden">{isSaved ? 'Saved!' : 'Save'}</span>
            </button>
          </div>
        </header>

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto pb-12">
            
            {activeTab === 'landing_flow' && (
              <>
                
              <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm mb-8">
                <div className="border-b border-slate-100 pb-5 mb-8">
                  <h3 className="font-semibold text-slate-800 text-lg">Website Logo</h3>
                  <p className="text-sm text-slate-500 mt-1">This logo appears in the top navigation header.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-48 h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 shrink-0 overflow-hidden relative group">
                    {draftImages.logo ? (
                      <>
                        <img src={draftImages.logo} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                        <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <ImageIcon className="w-8 h-8 text-slate-600" />
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-slate-400">
                        <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                        <span className="text-[13px] font-medium">No Logo</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-5 w-full max-w-xl">
                    <div>
                      <label className="block text-[13px] font-bold text-slate-700 mb-2">Upload New Logo</label>
                      <label className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold transition-colors border-2 border-emerald-100 border-dashed w-full">
                        <Upload className="w-5 h-5" />
                        <span>Browse files from your device</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setDraftImages({ ...draftImages, logo: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <p className="text-[11px] text-slate-500 mt-2 font-medium">Recommended: Transparent PNG or SVG. Max size: 2MB.</p>
                    </div>

                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-slate-100"></div>
                      <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">OR</span>
                      <div className="flex-grow border-t border-slate-100"></div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-slate-700 mb-2">Use Image URL</label>
                      <input 
                        type="text"
                        value={draftImages.logo || ''}
                        onChange={(e) => setDraftImages({ ...draftImages, logo: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-[13px] shadow-sm transition-all"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

                {renderSection('landing')}
              </>
            )}

            {activeTab === 'assessment_flow' && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">1. Formulir Data Diri</h2>
                  {renderSection('form')}
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">2. Teks Panduan & Skala Penilaian</h2>
                  {renderSection('questions')}
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">3. Daftar Pertanyaan (Assessment)</h2>
                  {renderSection('assessmentData')}
                </div>
              </>
            )}

            {activeTab === 'result_flow' && (
              <>
                {renderSection('result')}
              </>
            )}

            {activeTab === 'admin_flow' && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Halaman Admin Dashboard</h2>
                  {renderSection('admin')}
                </div>
              </>
            )}
            
            {/* removed old images block */ false && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="border-b border-slate-100 pb-5 mb-8">
                  <h3 className="font-semibold text-slate-800 text-lg">Website Logo</h3>
                  <p className="text-sm text-slate-500 mt-1">This logo appears in the top navigation header.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-48 h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 shrink-0 overflow-hidden relative group">
                    {draftImages.logo ? (
                      <>
                        <img src={draftImages.logo} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                        <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <ImageIcon className="w-8 h-8 text-slate-600" />
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-slate-400">
                        <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                        <span className="text-[13px] font-medium">No Logo</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-5 w-full max-w-xl">
                    <div>
                      <label className="block text-[13px] font-bold text-slate-700 mb-2">Upload New Logo</label>
                      <label className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold transition-colors border-2 border-emerald-100 border-dashed w-full">
                        <Upload className="w-5 h-5" />
                        <span>Browse files from your device</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setDraftImages({ ...draftImages, logo: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <p className="text-[11px] text-slate-500 mt-2 font-medium">Recommended: Transparent PNG or SVG. Max size: 2MB.</p>
                    </div>

                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-slate-100"></div>
                      <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">OR</span>
                      <div className="flex-grow border-t border-slate-100"></div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-slate-700 mb-2">Use Image URL</label>
                      <input 
                        type="text"
                        value={draftImages.logo || ''}
                        onChange={(e) => setDraftImages({ ...draftImages, logo: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white text-[13px] shadow-sm transition-all"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
