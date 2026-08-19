const fs = require('fs');
let code = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf-8');

code = code.replace(
  /options=\{\[\s*\{\s*label:\s*t\('form\.industries\.finance'\),\s*value:\s*'finance'\s*\},[\s\S]*?\{\s*label:\s*t\('form\.industries\.other'\),\s*value:\s*'other'\s*\}\s*\]\}/,
  "options={Object.entries(translations[language].form.industries).map(([k, v]) => ({ label: v as string, value: k }))}"
);

code = code.replace(
  /options=\{\[\s*\{\s*label:\s*t\('form\.companySizes\.s50'\),\s*value:\s*'1-50'\s*\},[\s\S]*?\{\s*label:\s*t\('form\.companySizes\.splus'\),\s*value:\s*'1000\+'\s*\}\s*\]\}/,
  "options={Object.entries(translations[language].form.companySizes).map(([k, v]) => ({ label: v as string, value: k }))}"
);

code = code.replace(
  /options=\{\[\s*\{\s*label:\s*t\('form\.timelines\.m3'\),\s*value:\s*'0-3 months'\s*\},[\s\S]*?\{\s*label:\s*t\('form\.timelines\.none'\),\s*value:\s*'none'\s*\}\s*\]\}/,
  "options={Object.entries(translations[language].form.timelines).map(([k, v]) => ({ label: v as string, value: k }))}"
);

fs.writeFileSync('src/components/AssessmentForm.tsx', code);
