const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// 1. Update Tabs
const oldTabsRegex = /const tabs = \[\s+([\s\S]*?)\];/;
const newTabs = `const tabs = [
    { id: 'landing_flow', label: 'Landing Page', icon: LayoutTemplate, desc: 'Logo & Homepage Content' },
    { id: 'assessment_flow', label: 'Assessment Page', icon: ListTodo, desc: 'Form, Questions & Scale' },
    { id: 'result_flow', label: 'Results Page', icon: CheckCircle, desc: 'Completion text & summary' },
    { id: 'admin_flow', label: 'Admin Page', icon: AlertCircle, desc: 'Admin login & settings' }
  ];`;
content = content.replace(oldTabsRegex, newTabs);

content = content.replace(
  "const [activeTab, setActiveTab] = useState<string>('images');",
  "const [activeTab, setActiveTab] = useState<string>('landing_flow');"
);

// 2. Extract the "images" block for reuse
const renderImagesSection = `
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
`;

// 3. Update the main render area
const mainAreaTarget = `{activeTab !== 'images' && renderSection(activeTab)}
            
            {activeTab === 'images' && (`;

const mainAreaReplacement = `
            {activeTab === 'landing_flow' && (
              <>
                ${renderImagesSection}
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
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">2. Daftar Pertanyaan (Assessment)</h2>
                  {renderSection('assessmentData')}
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">3. Teks Panduan & Skala Penilaian</h2>
                  {renderSection('questions')}
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
                {renderSection('header')}
              </>
            )}
            
            {/* removed old images block */ false && (`;

content = content.replace(mainAreaTarget, mainAreaReplacement);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
