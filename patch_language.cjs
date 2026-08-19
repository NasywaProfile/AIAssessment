const fs = require('fs');

// Patch LanguageContext.tsx
let langContent = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');
langContent = langContent.replace(
  "      pillar: 'Pilar',\n      of: 'dari',",
  "      pillarIndicator: 'Pilar {current} dari {total}',"
);
langContent = langContent.replace(
  "      pillar: 'Pillar',\n      of: 'of',",
  "      pillarIndicator: 'Pillar {current} of {total}',"
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', langContent);

// Patch AssessmentQuestions.tsx
let compContent = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');
compContent = compContent.replace(
  "{t('questions.pillar')} {currentStep + 1} {t('questions.of')} 5",
  "{t('questions.pillarIndicator').replace('{current}', String(currentStep + 1)).replace('{total}', '5')}"
);
fs.writeFileSync('src/components/AssessmentQuestions.tsx', compContent);
