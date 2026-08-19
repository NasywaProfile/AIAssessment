const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

content = content.replace("const { t } = useLanguage();", "const { t, language, translations } = useLanguage();");

content = content.replace("'Strategy & Leadership': s.scores.strategi.toFixed(2),", "[translations[language].assessmentData[0]?.shortTitle || 'Strategy & Leadership']: s.scores.strategi.toFixed(2),");
content = content.replace("'Process & Workflow': s.scores.proses.toFixed(2),", "[translations[language].assessmentData[1]?.shortTitle || 'Process & Workflow']: s.scores.proses.toFixed(2),");
content = content.replace("'People & Capabilities': s.scores.sdm.toFixed(2),", "[translations[language].assessmentData[2]?.shortTitle || 'People & Capabilities']: s.scores.sdm.toFixed(2),");
content = content.replace("'Data & Technology': s.scores.data.toFixed(2),", "[translations[language].assessmentData[3]?.shortTitle || 'Data & Technology']: s.scores.data.toFixed(2),");
content = content.replace("'Governance & AI': s.scores.tataKelola.toFixed(2)", "[translations[language].assessmentData[4]?.shortTitle || 'Governance & AI']: s.scores.tataKelola.toFixed(2)");

content = content.replace(
  `{ name: 'Strategy', score: averages.strategi },
      { name: 'Process', score: averages.proses },
      { name: 'People', score: averages.sdm },
      { name: 'Data', score: averages.data },
      { name: 'Governance', score: averages.tataKelola }`,
  `{ name: translations[language].assessmentData[0]?.shortTitle || 'Strategy', score: averages.strategi },
      { name: translations[language].assessmentData[1]?.shortTitle || 'Process', score: averages.proses },
      { name: translations[language].assessmentData[2]?.shortTitle || 'People', score: averages.sdm },
      { name: translations[language].assessmentData[3]?.shortTitle || 'Data', score: averages.data },
      { name: translations[language].assessmentData[4]?.shortTitle || 'Governance', score: averages.tataKelola }`
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
