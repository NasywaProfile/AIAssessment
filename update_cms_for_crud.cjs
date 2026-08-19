const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// Add tab
const tabsTarget = `const tabs = [
    { id: 'landing', label: 'Landing Page', icon: LayoutTemplate, desc: 'Homepage content & hero section' },
    { id: 'form', label: 'Assessment Form', icon: FileText, desc: 'Form fields and placeholders' },
    { id: 'questions', label: 'Questions & Scale', icon: HelpCircle, desc: 'Survey instructions and rating scale' },
    { id: 'result', label: 'Results Page', icon: CheckCircle, desc: 'Completion page text' },
    { id: 'images', label: 'Images & Logo', icon: ImageIcon, desc: 'Website logo and assets' }
  ];`;

const tabsReplacement = `const tabs = [
    { id: 'landing', label: 'Landing Page', icon: LayoutTemplate, desc: 'Homepage content & hero section' },
    { id: 'form', label: 'Assessment Form', icon: FileText, desc: 'Form fields and placeholders' },
    { id: 'assessmentData', label: 'Assessment Questions', icon: FileText, desc: 'Manage pillars and questions' },
    { id: 'questions', label: 'Survey Text & Scale', icon: HelpCircle, desc: 'Survey instructions and rating scale' },
    { id: 'result', label: 'Results Page', icon: CheckCircle, desc: 'Completion page text' },
    { id: 'images', label: 'Images & Logo', icon: ImageIcon, desc: 'Website logo and assets' }
  ];`;
content = content.replace(tabsTarget, tabsReplacement);

// Render Section custom logic for assessmentData
const renderSectionTarget = `    if (!idData) {
      return (
        <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 border-dashed">
          <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
          <p className="text-sm">No content fields available for this section.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {Object.keys(idData).map(key => renderFieldGroup(sectionId, [key], idData[key], enData?.[key]))}
      </div>
    );
  };`;

const renderSectionReplacement = `    if (sectionId === 'assessmentData') {
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
                    {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'shortTitle'], pillar.shortTitle, 'Short Title')}
                    {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'shortTitle'], enPillars[pIndex]?.shortTitle || '', 'Short Title')}
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
        {Object.keys(idData).map(key => renderFieldGroup(sectionId, [key], idData[key], enData?.[key]))}
      </div>
    );
  };`;

content = content.replace(renderSectionTarget, renderSectionReplacement);
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
