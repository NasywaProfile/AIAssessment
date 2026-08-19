const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');

content = content.replace(
  "{(t('questions.instructions') as any as string[]).map((inst, idx) => (",
  "{Array.isArray(t('questions.instructions')) && (t('questions.instructions') as any as string[]).map((inst, idx) => ("
);

fs.writeFileSync('src/components/AssessmentQuestions.tsx', content);
