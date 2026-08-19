const fs = require('fs');
let code = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf-8');

code = code.replace(
  "  const scoringScale = translations[language].questions.scale;",
  `  let scoringScale = translations[language].questions.scale;
  if (!Array.isArray(scoringScale)) {
    // Fallback if localstorage corrupted it into an object
    if (typeof scoringScale === 'object' && scoringScale !== null) {
      scoringScale = Object.values(scoringScale);
    } else {
      scoringScale = [];
    }
  }`
);

fs.writeFileSync('src/components/AssessmentQuestions.tsx', code);
