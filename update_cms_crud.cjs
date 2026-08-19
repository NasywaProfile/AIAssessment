const fs = require('fs');
let code = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf-8');

// 1. Add handleAddOption and handleRemoveOption before renderInputField
const helpers = `
  const handleAddOption = (section: string, path: string[]) => {
    const newKey = window.prompt("Masukkan ID unik untuk opsi baru (tanpa spasi, huruf kecil, contoh: 'education'):");
    if (!newKey) return;
    const newKeyClean = newKey.replace(/\\s+/g, '').toLowerCase();
    
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
    if (!window.confirm(\`Hapus opsi '\${keyToRemove}'?\`)) return;
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
`;

code = code.replace(
  "const renderInputField = (lang: 'ID' | 'EN', section: string, path: string[], value: string, label: string) => {",
  helpers + "\n  const renderInputField = (lang: 'ID' | 'EN', section: string, path: string[], value: string, label: string) => {"
);

// 2. Modify "Nested Object" render logic to include remove button and add button
const nestedObjectTarget = `    // Nested Object (like industries, pillars, companySizes)
    if (typeof valID === 'object' && valID !== null) {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
            <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">Options</span>
          </div>
          <div className="p-5 grid grid-cols-1 gap-4">
            {Object.keys(valID).map(key => (
               <div key={key} className="flex flex-col md:flex-row gap-5 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                 <div className="flex-none w-32 pt-1">
                   <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-1.5 rounded-md">{key}</span>
                 </div>
                 <div className="flex-1 flex flex-col md:flex-row gap-5">
                   {renderInputField('ID', section, [...path, key], valID[key], 'ID')}
                   {renderInputField('EN', section, [...path, key], valEN?.[key] || '', 'EN')}
                 </div>
               </div>
            ))}
          </div>
        </div>
      );
    }`;

const nestedObjectReplacement = `    // Nested Object (like industries, pillars, companySizes)
    if (typeof valID === 'object' && valID !== null) {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
            <div className="flex gap-2 items-center">
              <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">Options</span>
              <button 
                onClick={() => handleAddOption(section, path)}
                className="text-xs px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors font-semibold"
              >
                + Tambah Opsi
              </button>
            </div>
          </div>
          <div className="p-5 grid grid-cols-1 gap-4">
            {Object.keys(valID).map(key => (
               <div key={key} className="flex flex-col md:flex-row gap-5 p-5 bg-white rounded-xl border border-slate-100 shadow-sm relative group">
                 <div className="flex-none w-32 pt-1 flex flex-col gap-2">
                   <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-1.5 rounded-md break-all">{key}</span>
                   <button 
                     onClick={() => handleRemoveOption(section, path, key)}
                     className="text-[10px] text-red-500 hover:text-red-600 font-bold self-start mt-2"
                   >
                     Hapus
                   </button>
                 </div>
                 <div className="flex-1 flex flex-col md:flex-row gap-5">
                   {renderInputField('ID', section, [...path, key], valID[key], 'ID')}
                   {renderInputField('EN', section, [...path, key], valEN?.[key] || '', 'EN')}
                 </div>
               </div>
            ))}
          </div>
        </div>
      );
    }`;

code = code.replace(nestedObjectTarget, nestedObjectReplacement);
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', code);
