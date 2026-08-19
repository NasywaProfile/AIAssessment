const fs = require('fs');

let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Patch ID industries
const idIndustriesTarget = `industries: {
        it: 'Teknologi Informasi',
        finance: 'Keuangan & Perbankan',
        education: 'Pendidikan',
        healthcare: 'Kesehatan',
        manufacturing: 'Manufaktur',
        other: 'Lainnya'
      },`;
const idIndustriesReplacement = `industries: {
        finance: 'Perbankan & Keuangan',
        it: 'Teknologi & IT',
        manufacturing: 'Manufaktur',
        retail: 'Retail & E-commerce',
        healthcare: 'Healthcare',
        education: 'Pendidikan',
        telecom: 'Telekomunikasi',
        energy: 'Energi',
        logistics: 'Transportasi & Logistik',
        other: 'Lainnya'
      },`;

// Patch EN industries
const enIndustriesTarget = `industries: {
        it: 'Information Technology',
        finance: 'Finance & Banking',
        education: 'Education',
        healthcare: 'Healthcare',
        manufacturing: 'Manufacturing',
        other: 'Other'
      },`;
const enIndustriesReplacement = `industries: {
        finance: 'Banking & Finance',
        it: 'Technology & IT',
        manufacturing: 'Manufacturing',
        retail: 'Retail & E-commerce',
        healthcare: 'Healthcare',
        education: 'Education',
        telecom: 'Telecommunications',
        energy: 'Energy',
        logistics: 'Transportation & Logistics',
        other: 'Other'
      },`;

// Patch ID company sizes
const idCompanySizesTarget = `companySizes: {
        small: '1 - 50 Karyawan',
        medium: '51 - 200 Karyawan',
        large: '201 - 1000 Karyawan',
        enterprise: '1000+ Karyawan'
      },`;
const idCompanySizesReplacement = `companySizes: {
        s50: '1-50 karyawan',
        s200: '51-200 karyawan',
        s500: '201-500 karyawan',
        s1000: '501-1000 karyawan',
        splus: '1000+ karyawan'
      },`;

// Patch EN company sizes
const enCompanySizesTarget = `companySizes: {
        small: '1 - 50 Employees',
        medium: '51 - 200 Employees',
        large: '201 - 1000 Employees',
        enterprise: '1000+ Employees'
      },`;
const enCompanySizesReplacement = `companySizes: {
        s50: '1-50 employees',
        s200: '51-200 employees',
        s500: '201-500 employees',
        s1000: '501-1000 employees',
        splus: '1000+ employees'
      },`;

// Patch ID timelines
const idTimelinesTarget = `timelines: {
        soon: 'Segera (1-3 Bulan)',
        short: 'Jangka Pendek (3-6 Bulan)',
        medium: 'Jangka Menengah (6-12 Bulan)',
        long: 'Jangka Panjang (>1 Tahun)',
        exploring: 'Masih dalam tahap eksplorasi'
      },`;
const idTimelinesReplacement = `timelines: {
        m3: '0-3 bulan',
        m6: '3-6 bulan',
        m12: '6-12 bulan',
        mplus: '12+ bulan',
        none: 'Belum ada timeline'
      },`;

// Patch EN timelines
const enTimelinesTarget = `timelines: {
        soon: 'Immediate (1-3 Months)',
        short: 'Short Term (3-6 Months)',
        medium: 'Medium Term (6-12 Months)',
        long: 'Long Term (>1 Year)',
        exploring: 'Still in exploration phase'
      },`;
const enTimelinesReplacement = `timelines: {
        m3: '0-3 months',
        m6: '3-6 months',
        m12: '6-12 months',
        mplus: '12+ months',
        none: 'No timeline yet'
      },`;

content = content.replace(idIndustriesTarget, idIndustriesReplacement);
content = content.replace(enIndustriesTarget, enIndustriesReplacement);
content = content.replace(idCompanySizesTarget, idCompanySizesReplacement);
content = content.replace(enCompanySizesTarget, enCompanySizesReplacement);
content = content.replace(idTimelinesTarget, idTimelinesReplacement);
content = content.replace(enTimelinesTarget, enTimelinesReplacement);

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
console.log('patched contexts');
