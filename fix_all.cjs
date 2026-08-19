const fs = require('fs');

// 1. LanguageContext.tsx
let langContent = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Replace pillarIndicator string with pillarIndicators array
langContent = langContent.replace(
  "pillarIndicator: 'Pilar {current} dari {total}',",
  "pillarIndicators: ['Pilar 1 dari 5', 'Pilar 2 dari 5', 'Pilar 3 dari 5', 'Pilar 4 dari 5', 'Pilar 5 dari 5'],"
);
langContent = langContent.replace(
  "pillarIndicator: 'Pillar {current} of {total}',",
  "pillarIndicators: ['Pillar 1 of 5', 'Pillar 2 of 5', 'Pillar 3 of 5', 'Pillar 4 of 5', 'Pillar 5 of 5'],"
);

// We need to handle migration of localStorage in LanguageContext so it doesn't break.
// Wait, if users already have 'pillarIndicator' saved in local storage, 'pillarIndicators' might be undefined in their parsed draft.
// We should update the merge logic in LanguageContext.
const mergeLogic = `
          if (!parsed[lang].assessmentData) {
            merged[lang].assessmentData = JSON.parse(JSON.stringify(defaultTranslations[lang].assessmentData));
          }
`;
const newMergeLogic = `
          if (!parsed[lang].assessmentData) {
            merged[lang].assessmentData = JSON.parse(JSON.stringify(defaultTranslations[lang].assessmentData));
          }
          if (!parsed[lang].questions.pillarIndicators) {
            merged[lang].questions.pillarIndicators = JSON.parse(JSON.stringify(defaultTranslations[lang].questions.pillarIndicators));
          }
`;
langContent = langContent.replace(mergeLogic, newMergeLogic);
fs.writeFileSync('src/contexts/LanguageContext.tsx', langContent);


// 2. AssessmentQuestions.tsx
let aqContent = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');
aqContent = aqContent.replace(
  "{t('questions.pillarIndicator').replace('{current}', String(currentStep + 1)).replace('{total}', '5')}",
  "{translations[language].questions.pillarIndicators?.[currentStep] || `Pillar ${currentStep + 1} of 5`}"
);
fs.writeFileSync('src/components/AssessmentQuestions.tsx', aqContent);


// 3. CMSDashboard.tsx
let cmsContent = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// A. Filter out keys from landing and form
const filterLogic = `
    // Only render fields that exist in defaultTranslations
    const defaultIdData = defaultTranslations['ID'][sectionId as keyof typeof defaultTranslations['ID']];
    if (idData && defaultIdData) {
      const filteredIdData: any = {};
      Object.keys(defaultIdData).forEach(key => {
        if (idData[key] !== undefined) {
          filteredIdData[key] = idData[key];
        }
      });
      idData = filteredIdData;
    }
`;
const newFilterLogic = `
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
      if (sectionId === 'landing') {
        delete filteredIdData['pillars'];
      }
      if (sectionId === 'form') {
        delete filteredIdData['industries'];
        delete filteredIdData['companySizes'];
        delete filteredIdData['timelines'];
        delete filteredIdData['dropdownPlaceholder'];
      }
      if (sectionId === 'questions') {
        delete filteredIdData['pillarIndicator']; // hide legacy field
      }

      idData = filteredIdData;
    }
`;
cmsContent = cmsContent.replace(filterLogic, newFilterLogic);


// B. Hide shortTitle from assessmentData rendering
const shortTitleTarget = `                  <div className="flex flex-col md:flex-row gap-5">
                    {renderInputField('ID', 'assessmentData', [pIndex.toString(), 'shortTitle'], pillar.shortTitle, 'Short Title')}
                    {renderInputField('EN', 'assessmentData', [pIndex.toString(), 'shortTitle'], enPillars[pIndex]?.shortTitle || '', 'Short Title')}
                  </div>`;
cmsContent = cmsContent.replace(shortTitleTarget, "");


// C. Swap questions and assessmentData in assessment_flow, and add admin section
const flowTarget = `            {activeTab === 'assessment_flow' && (
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
            )}`;

const flowReplacement = `            {activeTab === 'assessment_flow' && (
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
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Admin Login Button</h2>
                  {renderSection('header')}
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Halaman Admin Dashboard</h2>
                  {renderSection('admin')}
                </div>
              </>
            )}`;
cmsContent = cmsContent.replace(flowTarget, flowReplacement);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', cmsContent);

