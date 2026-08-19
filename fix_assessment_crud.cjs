const fs = require('fs');
let code = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf-8');

const target = `    if (sectionId === 'assessmentData') {
      const idPillars = draftTranslations['ID'].assessmentData || [];
      const enPillars = draftTranslations['EN'].assessmentData || [];
      
      return (
        <div className="space-y-8">
          {idPillars.map((pillar: any, pIndex: number) => (
            <div key={pIndex} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg">Pillar {pIndex + 1}: {pillar.title}</h3>
              </div>
              <div className="p-5 space-y-6">
                
                {/* Pillar Info */}
                <div className="space-y-4 border-b border-slate-100 pb-6">
                  <h4 className="font-semibold text-sm text-slate-700">Pillar Details</h4>
                  <div className="flex flex-col md:flex-row gap-5">
                    {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'title'], pillar.title, 'Title')}
                    {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'title'], enPillars[pIndex]?.title || '', 'Title')}
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'description'], pillar.description, 'Description')}
                    {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'description'], enPillars[pIndex]?.description || '', 'Description')}
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <h4 className="font-semibold text-sm text-slate-700 mb-4">Questions</h4>
                  <div className="space-y-4">
                    {pillar.questions.map((q: any, qIndex: number) => (
                      <div key={qIndex} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="mb-2 text-xs font-bold text-slate-500">Question {qIndex + 1} (ID: {q.id})</div>
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
    }`;

const replacement = `    if (sectionId === 'assessmentData') {
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
                    {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'shortTitle'], pillar.shortTitle || pillar.title, 'Short Title (For Progress)')}
                    {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'shortTitle'], enPillars[pIndex]?.shortTitle || enPillars[pIndex]?.title || '', 'Short Title (For Progress)')}
                  </div>

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
    }`;

code = code.replace(target, replacement);

// We need to also clear the restrictions on the exclusions so that admin can edit login text
code = code.replace(
  `      // Exclusions based on requests
      if (sectionId === 'landing') {
        delete filteredIdData['pillars'];
      }
      if (sectionId === 'form') {
        delete filteredIdData['dropdownPlaceholder'];
      }
      if (sectionId === 'questions') {
        delete filteredIdData['pillarIndicator']; // hide legacy field
      }
      if (sectionId === 'admin') {
        delete filteredIdData['loginTitle'];
        delete filteredIdData['loginSubtitle'];
        delete filteredIdData['loginHeader'];
        delete filteredIdData['password'];
        delete filteredIdData['passwordPlaceholder'];
        delete filteredIdData['wrongPassword'];
        delete filteredIdData['loginBtn'];
        delete filteredIdData['backHome'];
        delete filteredIdData['submissions'];
        delete filteredIdData['of'];
        delete filteredIdData['showing'];
      }`,
  `      // Exclusions based on requests
      if (sectionId === 'questions') {
        delete filteredIdData['pillarIndicator']; // hide legacy field
      }`
);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', code);
