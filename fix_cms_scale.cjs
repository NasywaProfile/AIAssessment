const fs = require('fs');
let code = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf-8');

const target = `    if (Array.isArray(valID) && typeof valID[0] === 'object') {
      return (
        <div key={path.join('.')} className="mb-6 bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
          </div>
          <div className="p-5 space-y-4">
            {valID.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row gap-5 items-start p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="flex-none bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold border border-emerald-100">
                  Score: {item.score}
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
    }`;

const replacement = `    if (Array.isArray(valID) && typeof valID[0] === 'object') {
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
    }`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', code);
