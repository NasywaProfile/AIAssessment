const fs = require('fs');
let code = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf-8');

code = code.replace(
  /options=\{\[\s*\{\s*label:\s*t\('form\.timelines\.m3'\),\s*value:\s*'0-3m'\s*\},[\s\S]*?\{\s*label:\s*t\('form\.timelines\.none'\),\s*value:\s*'none'\s*\}\s*\]\}/,
  "options={Object.entries(translations[language].form.timelines).map(([k, v]) => ({ label: v as string, value: k }))}"
);

fs.writeFileSync('src/components/AssessmentForm.tsx', code);
