const fs = require('fs');

let contentContext = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Update ID
contentContext = contentContext.replace(
  /industry: 'Industri',/,
  "industry: 'Industri',\n      industryPlaceholder: 'Pilih industri',"
);
contentContext = contentContext.replace(
  /companySize: 'Ukuran Instansi',/,
  "companySize: 'Ukuran Instansi',\n      companySizePlaceholder: 'Pilih ukuran instansi',"
);

// Update EN
contentContext = contentContext.replace(
  /industry: 'Industry',/,
  "industry: 'Industry',\n      industryPlaceholder: 'Select industry',"
);
contentContext = contentContext.replace(
  /companySize: 'Company Size',/,
  "companySize: 'Company Size',\n      companySizePlaceholder: 'Select company size',"
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', contentContext);

let contentForm = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf8');
contentForm = contentForm.replace(
  /id="industri"[\s\S]*?placeholder={t\('form.dropdownPlaceholder'\)}/,
  `id="industri" \n                label={t('form.industry')}\n                required \n                placeholder={t('form.industryPlaceholder')}`
);
contentForm = contentForm.replace(
  /id="ukuranInstansi"[\s\S]*?placeholder={t\('form.dropdownPlaceholder'\)}/,
  `id="ukuranInstansi" \n                label={t('form.companySize')}\n                required \n                placeholder={t('form.companySizePlaceholder')}`
);
fs.writeFileSync('src/components/AssessmentForm.tsx', contentForm);
console.log('patched placeholders');
