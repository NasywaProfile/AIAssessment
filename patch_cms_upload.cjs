const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// Add Upload icon import
content = content.replace(
  "import { Save, Image as ImageIcon, Globe, ChevronRight, CheckCircle2, RefreshCcw, LogOut } from 'lucide-react';",
  "import { Save, Image as ImageIcon, Globe, ChevronRight, CheckCircle2, RefreshCcw, LogOut, Upload } from 'lucide-react';"
);

// Replace the input section
const oldInputSection = `<div className="flex-1 space-y-2">
                      <input 
                        type="text"
                        value={draftImages.logo || ''}
                        onChange={(e) => setDraftImages({ ...draftImages, logo: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                        placeholder="e.g., /LogoNortis.png or https://..."
                      />
                      <p className="text-xs text-slate-500">Provide an absolute URL (https://...) or a relative path (e.g., /LogoNortis.png). We recommend a transparent PNG.</p>
                    </div>`;

const newInputSection = `<div className="flex-1 space-y-3">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={draftImages.logo || ''}
                          onChange={(e) => setDraftImages({ ...draftImages, logo: e.target.value })}
                          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                          placeholder="e.g., /LogoNortis.png or https://..."
                        />
                        <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-sm font-medium transition-colors border border-emerald-200 shrink-0">
                          <Upload className="w-4 h-4" />
                          <span className="hidden sm:inline">Upload File</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setDraftImages({ ...draftImages, logo: reader.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">Provide a URL or click "Upload File" to select an image from your device. Transparent PNG recommended.</p>
                    </div>`;

content = content.replace(oldInputSection, newInputSection);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
