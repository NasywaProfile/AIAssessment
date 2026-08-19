const fs = require('fs');
let code = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf-8');

code = code.replace(
  `      if (sectionId === 'form') {
        delete filteredIdData['industries']; // Rendered in admin
        delete filteredIdData['dropdownPlaceholder'];
      }`,
  `      if (sectionId === 'form') {
        delete filteredIdData['dropdownPlaceholder'];
      }`
);

// We need to fix the title override since industries is now in form
code = code.replace(
  `          if (sectionId === 'admin' && key === 'industryLabel') {
            titleOverride = 'Pilihan Industri (Sektor)';
          }
          if (sectionId === 'form' && key === 'companySizes') {
            titleOverride = 'Pilihan Ukuran Perusahaan';
          }
          if (sectionId === 'form' && key === 'timelines') {
            titleOverride = 'Pilihan Estimasi Waktu';
          }`,
  `          if (sectionId === 'admin' && key === 'industryLabel') {
            titleOverride = 'Label Industri (Admin)';
          }
          if (sectionId === 'form' && key === 'industries') {
            titleOverride = 'Pilihan Industri (Sektor)';
          }
          if (sectionId === 'form' && key === 'companySizes') {
            titleOverride = 'Pilihan Ukuran Perusahaan';
          }
          if (sectionId === 'form' && key === 'timelines') {
            titleOverride = 'Pilihan Estimasi Waktu';
          }`
);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', code);
