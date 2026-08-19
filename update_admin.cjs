const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf-8');

const filterIndustryTarget = `<option value="finance">{t('form.industries.finance')}</option>
                  <option value="it">{t('form.industries.it')}</option>
                  <option value="manufacturing">{t('form.industries.manufacturing')}</option>
                  <option value="retail">{t('form.industries.retail')}</option>
                  <option value="healthcare">{t('form.industries.healthcare')}</option>
                  <option value="education">{t('form.industries.education')}</option>
                  <option value="telecom">{t('form.industries.telecom')}</option>
                  <option value="energy">{t('form.industries.energy')}</option>
                  <option value="logistics">{t('form.industries.logistics')}</option>
                  <option value="other">{t('form.industries.other')}</option>`;

const filterIndustryReplacement = `{Object.entries(translations[language].form.industries || {}).map(([key, label]) => (
                    <option key={key} value={key}>{label as string}</option>
                  ))}`;

code = code.replace(filterIndustryTarget, filterIndustryReplacement);

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
