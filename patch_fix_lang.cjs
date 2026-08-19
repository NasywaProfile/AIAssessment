const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Insert into ID questions
content = content.replace(
  "subtitle: 'Evaluasi kesiapan organisasi Anda dalam mengadopsi teknologi AI',",
  "subtitle: 'Evaluasi kesiapan organisasi Anda dalam mengadopsi teknologi AI',\n      instructionsTitle: 'Petunjuk Pengisian',\n      instructions: [\n        'Skor tiap pertanyaan: 0–5',\n        'Jawaban diisi oleh key stakeholder (management, IT, HR, unit kerja)',\n        'Skor harus mencerminkan kondisi nyata, bukan target'\n      ],"
);

// Insert into EN questions
content = content.replace(
  "subtitle: 'Evaluate your organization\\'s readiness in adopting AI technology',",
  "subtitle: 'Evaluate your organization\\'s readiness in adopting AI technology',\n      instructionsTitle: 'Assessment Guidelines',\n      instructions: [\n        'Score for each question: 0–5',\n        'Answers should be provided by key stakeholders (management, IT, HR, operational units)',\n        'Scores must reflect current reality, not future targets'\n      ],"
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
