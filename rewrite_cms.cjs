const fs = require('fs');

const content = `import React, { useState } from 'react';
import { useLanguage, defaultTranslations } from '../../contexts/LanguageContext';
import { Save, Image as ImageIcon, LayoutTemplate, FileText, HelpCircle, CheckCircle, Upload, CheckCircle2, RefreshCcw, LogOut, ChevronRight, AlertCircle } from 'lucide-react';

// Helper to humanize keys (e.g. "companyNamePlaceholder" -> "Company Name Placeholder")
const humanize = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export function CMSDashboard({ onBack }: { onBack: () => void }) {
  const { translations, updateTranslations, images, updateImage } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [draftTranslations, setDraftTranslations] = useState<any>(JSON.parse(JSON.stringify(translations)));
  const [draftImages, setDraftImages] = useState<Record<string, string>>({ ...images });
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: 'landing', label: 'Landing Page', icon: LayoutTemplate, desc: 'Homepage content & hero section' },
    { id: 'form', label: 'Assessment Form', icon: FileText, desc: 'Form fields and placeholders' },
    { id: 'questions', label: 'Questions & Scale', icon: HelpCircle, desc: 'Survey instructions and rating scale' },
    { id: 'result', label: 'Results Page', icon: CheckCircle, desc: 'Completion page text' },
    { id: 'images', label: 'Images & Logo', icon: ImageIcon, desc: 'Website logo and assets' }
  ];

  const handleSave = () => {
    updateTranslations(draftTranslations);
    Object.entries(draftImages).forEach(([key, url]) => {
      updateImage(key, url);
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

  const renderInputField = (lang: 'ID' | 'EN', section: string, path: string[], value: string, label: string) => {
    const isTextArea = value.length > 60 || path[path.length - 1].toLowerCase().includes('desc');
    return (
      <div className="flex-1">
        <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{lang === 'ID' ? 'Bahasa Indonesia' : 'English'}</label>
        {isTextArea ? (
          <textarea 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm min-h-[80px] focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            value={value}
            onChange={(e) => updateDraftText(lang, section, path, e.target.value)}
          />
        ) : (
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
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
        <div key={path.join('.')} className="mb-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">{title} <span className="text-xs font-normal text-slate-500 ml-2">(List)</span></h3>
          </div>
          <div className="p-4 space-y-4">
            {valID.map((item: string, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                <div className="flex-none w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">{idx + 1}</div>
                {renderInputField('ID', section, [...path, idx.toString()], item, 'ID')}
                {renderInputField('EN', section, [...path, idx.toString()], valEN?.[idx] || '', 'EN')}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Array of Objects (like scale: [{score: 0, label: ''}])
    if (Array.isArray(valID) && typeof valID[0] === 'object') {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">{title}</h3>
          </div>
          <div className="p-4 space-y-4">
            {valID.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 items-start p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                <div className="flex-none bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md text-sm font-bold border border-emerald-200">
                  Score: {item.score}
                </div>
                {renderInputField('ID', section, [...path, idx.toString(), 'label'], item.label, 'ID')}
                {renderInputField('EN', section, [...path, idx.toString(), 'label'], valEN?.[idx]?.label || '', 'EN')}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Standard String Field
    if (typeof valID === 'string') {
      return (
        <div key={path.join('.')} className="mb-4 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">{title}</h3>
          </div>
          <div className="p-4 flex flex-col md:flex-row gap-4">
            {renderInputField('ID', section, path, valID, 'ID')}
            {renderInputField('EN', section, path, valEN || '', 'EN')}
          </div>
        </div>
      );
    }

    // Nested Object (like industries, pillars, companySizes)
    if (typeof valID === 'object' && valID !== null) {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">{title} <span className="text-xs font-normal text-slate-500 ml-2">(Dropdown Options / Sub-fields)</span></h3>
          </div>
          <div className="p-4 grid grid-cols-1 gap-4">
            {Object.keys(valID).map(key => (
               <div key={key} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                 <div className="flex-none w-32 pt-2">
                   <span className="text-xs font-mono bg-slate-200 text-slate-600 px-2 py-1 rounded">{key}</span>
                 </div>
                 {renderInputField('ID', section, [...path, key], valID[key], 'ID')}
                 {renderInputField('EN', section, [...path, key], valEN?.[key] || '', 'EN')}
               </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderSection = (sectionId: string) => {
    const idData = draftTranslations['ID'][sectionId];
    const enData = draftTranslations['EN'][sectionId];
    
    if (!idData) {
      return (
        <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
          <p>No translation fields found for this section.</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {Object.keys(idData).map(key => renderFieldGroup(sectionId, [key], idData[key], enData?.[key]))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-50 shrink-0 md:min-h-screen flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-emerald-400" />
            Website Content
          </h2>
          <p className="text-xs text-slate-400 mt-2">Manage text and images for your public website.</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={\`w-full text-left px-4 py-3 rounded-xl transition-all flex items-start gap-3 \${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                }\`}
              >
                <Icon className={\`w-5 h-5 mt-0.5 shrink-0 \${isActive ? 'text-emerald-400' : 'text-slate-500'}\`} />
                <div>
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className={\`text-[11px] mt-0.5 \${isActive ? 'text-emerald-400/70' : 'text-slate-500'}\`}>{tab.desc}</div>
                </div>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors text-sm font-medium border border-slate-700"
          >
            <LogOut className="w-4 h-4" />
            Exit Content Manager
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white px-8 py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 shadow-sm z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 border border-slate-200"
              title="Reset to default"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaved ? 'Saved successfully!' : 'Save Changes'}
            </button>
          </div>
        </header>

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto pb-12">
            {activeTab !== 'images' && renderSection(activeTab)}
            
            {activeTab === 'images' && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="font-semibold text-slate-800 text-lg">Website Logo</h3>
                  <p className="text-sm text-slate-500 mt-1">This logo appears in the top navigation header.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-48 h-48 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 shrink-0 overflow-hidden relative group">
                    {draftImages.logo ? (
                      <>
                        <img src={draftImages.logo} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-slate-400">
                        <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <span className="text-xs font-medium">No Logo</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Upload New Logo</label>
                      <label className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-sm font-semibold transition-colors border-2 border-emerald-200 border-dashed w-full">
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
                      <p className="text-xs text-slate-500 mt-2">Recommended: Transparent PNG or SVG. Max size: 2MB.</p>
                    </div>

                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink-0 mx-4 text-xs font-medium text-slate-400 uppercase">OR</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Use Image URL</label>
                      <input 
                        type="text"
                        value={draftImages.logo || ''}
                        onChange={(e) => setDraftImages({ ...draftImages, logo: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm shadow-sm"
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
`;

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
