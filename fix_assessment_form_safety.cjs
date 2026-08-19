const fs = require('fs');
let code = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf-8');

code = code.replace(
  `options={Object.entries(translations[language].form.industries).map(([k, v]) => ({ label: v as string, value: k }))}`,
  `options={Object.entries(translations[language].form.industries || {}).map(([k, v]) => ({ label: v as string, value: k }))}`
);

code = code.replace(
  `options={Object.entries(translations[language].form.companySizes).map(([k, v]) => ({ label: v as string, value: k }))}`,
  `options={Object.entries(translations[language].form.companySizes || {}).map(([k, v]) => ({ label: v as string, value: k }))}`
);

code = code.replace(
  `options={Object.entries(translations[language].form.timelines).map(([k, v]) => ({ label: v as string, value: k }))}`,
  `options={Object.entries(translations[language].form.timelines || {}).map(([k, v]) => ({ label: v as string, value: k }))}`
);

fs.writeFileSync('src/components/AssessmentForm.tsx', code);
