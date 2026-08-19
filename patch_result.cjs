const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentResult.tsx', 'utf8');

content = content.replace('const { t } = useLanguage();', 'const { t, language, translations } = useLanguage();');

// Get the pillar names from assessmentData
const replaceTarget = `<div className="space-y-2 px-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">Strategy & Leadership</span>
                <span className="font-bold text-slate-800">{submission.scores.strategi.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">Process & Workflow</span>
                <span className="font-bold text-slate-800">{submission.scores.proses.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">People & Capabilities</span>
                <span className="font-bold text-slate-800">{submission.scores.sdm.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">Data & Technology</span>
                <span className="font-bold text-slate-800">{submission.scores.data.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">Governance & AI</span>
                <span className="font-bold text-slate-800">{submission.scores.tataKelola.toFixed(1)}</span>
              </div>
            </div>`;

const replacement = `
            <div className="space-y-2 px-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language].assessmentData[0]?.shortTitle || 'Strategy'}</span>
                <span className="font-bold text-slate-800">{submission.scores.strategi.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language].assessmentData[1]?.shortTitle || 'Process'}</span>
                <span className="font-bold text-slate-800">{submission.scores.proses.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language].assessmentData[2]?.shortTitle || 'People'}</span>
                <span className="font-bold text-slate-800">{submission.scores.sdm.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language].assessmentData[3]?.shortTitle || 'Data'}</span>
                <span className="font-bold text-slate-800">{submission.scores.data.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language].assessmentData[4]?.shortTitle || 'Governance'}</span>
                <span className="font-bold text-slate-800">{submission.scores.tataKelola.toFixed(1)}</span>
              </div>
            </div>
`;

content = content.replace(replaceTarget, replacement);
fs.writeFileSync('src/components/AssessmentResult.tsx', content);
