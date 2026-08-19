const fs = require('fs');
let code = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf-8');

const arrayStringTarget = `    if (Array.isArray(valID) && typeof valID[0] === 'string') {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
            <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">List items</span>
          </div>
          <div className="p-5 space-y-4">
            {valID.map((item: string, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row gap-5 p-5 bg-white rounded-xl border border-slate-100 shadow-sm relative group">
                <div className="flex-none w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold border border-emerald-100">{idx + 1}</div>
                <div className="flex-1 flex flex-col md:flex-row gap-5">
                  {renderInputField('ID', section, [...path, idx.toString()], item, 'ID')}
                  {renderInputField('EN', section, [...path, idx.toString()], valEN?.[idx] || '', 'EN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }`;

const arrayStringReplacement = `    if (Array.isArray(valID) && typeof valID[0] === 'string') {
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
    }`;

code = code.replace(arrayStringTarget, arrayStringReplacement);
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', code);
