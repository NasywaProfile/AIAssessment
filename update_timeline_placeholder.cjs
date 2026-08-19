const fs = require('fs');
let contentContext = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Update ID
contentContext = contentContext.replace(
  /timeline: 'Timeline Implementasi yang Diharapkan',/,
  "timeline: 'Timeline Implementasi yang Diharapkan',\n      timelinePlaceholder: 'Pilih timeline',"
);

// Update EN
contentContext = contentContext.replace(
  /timeline: 'Expected Implementation Timeline',/,
  "timeline: 'Expected Implementation Timeline',\n      timelinePlaceholder: 'Select timeline',"
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', contentContext);

let contentForm = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf8');
contentForm = contentForm.replace(
  /id="timeline"[\s\S]*?placeholder={t\('form.dropdownPlaceholder'\)}/,
  `id="timeline" \n                  label={t('form.timeline')}\n                  placeholder={t('form.timelinePlaceholder')}`
);
fs.writeFileSync('src/components/AssessmentForm.tsx', contentForm);
console.log('updated timeline placeholder');
