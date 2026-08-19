const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

const idToRemove = `      instructionsTitle: 'Petunjuk Pengisian',
      instructions: [
        'Skor tiap pertanyaan: 0–5',
        'Jawaban diisi oleh key stakeholder (management, IT, HR, unit kerja)',
        'Skor harus mencerminkan kondisi nyata, bukan target'
      ],
`;

const enToRemove = `      instructionsTitle: 'Assessment Guidelines',
      instructions: [
        'Score for each question: 0–5',
        'Answers should be provided by key stakeholders (management, IT, HR, operational units)',
        'Scores must reflect current reality, not future targets'
      ],
`;

content = content.replace(idToRemove, '');
content = content.replace(enToRemove, '');

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
