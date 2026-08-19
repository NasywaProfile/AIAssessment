const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Insert into ID
content = content.replace(
  "subtitle: 'Silakan isi penilaian di bawah ini dengan jujur dan objektif.',",
  "subtitle: 'Silakan isi penilaian di bawah ini dengan jujur dan objektif.',\n      instructionsTitle: 'Petunjuk Pengisian',\n      instructions: [\n        'Skor tiap pertanyaan: 0–5',\n        'Jawaban diisi oleh key stakeholder (management, IT, HR, unit kerja)',\n        'Skor harus mencerminkan kondisi nyata, bukan target'\n      ],"
);

// Insert into EN
content = content.replace(
  "subtitle: 'Please complete the assessment below honestly and objectively.',",
  "subtitle: 'Please complete the assessment below honestly and objectively.',\n      instructionsTitle: 'Assessment Guidelines',\n      instructions: [\n        'Score for each question: 0–5',\n        'Answers should be provided by key stakeholders (management, IT, HR, operational units)',\n        'Scores must reflect current reality, not future targets'\n      ],"
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
