const fs = require('fs');

let content = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf8');

const targetIndustries = `options={[
                  { label: t('form.industries.it'), value: 'it' },
                  { label: t('form.industries.finance'), value: 'finance' },
                  { label: t('form.industries.education'), value: 'education' },
                  { label: t('form.industries.healthcare'), value: 'healthcare' },
                  { label: t('form.industries.manufacturing'), value: 'manufacturing' },
                  { label: t('form.industries.other'), value: 'other' }
                ]}`;
const replacementIndustries = `options={[
                  { label: t('form.industries.finance'), value: 'finance' },
                  { label: t('form.industries.it'), value: 'it' },
                  { label: t('form.industries.manufacturing'), value: 'manufacturing' },
                  { label: t('form.industries.retail'), value: 'retail' },
                  { label: t('form.industries.healthcare'), value: 'healthcare' },
                  { label: t('form.industries.education'), value: 'education' },
                  { label: t('form.industries.telecom'), value: 'telecom' },
                  { label: t('form.industries.energy'), value: 'energy' },
                  { label: t('form.industries.logistics'), value: 'logistics' },
                  { label: t('form.industries.other'), value: 'other' }
                ]}`;

const targetCompanySizes = `options={[
                  { label: t('form.companySizes.small'), value: 'small' },
                  { label: t('form.companySizes.medium'), value: 'medium' },
                  { label: t('form.companySizes.large'), value: 'large' },
                  { label: t('form.companySizes.enterprise'), value: 'enterprise' }
                ]}`;
const replacementCompanySizes = `options={[
                  { label: t('form.companySizes.s50'), value: '1-50' },
                  { label: t('form.companySizes.s200'), value: '51-200' },
                  { label: t('form.companySizes.s500'), value: '201-500' },
                  { label: t('form.companySizes.s1000'), value: '501-1000' },
                  { label: t('form.companySizes.splus'), value: '1000+' }
                ]}`;

const targetTimelines = `options={[
                    { label: t('form.timelines.soon'), value: '1-3m' },
                    { label: t('form.timelines.short'), value: '3-6m' },
                    { label: t('form.timelines.medium'), value: '6-12m' },
                    { label: t('form.timelines.long'), value: 'long-term' },
                    { label: t('form.timelines.exploring'), value: 'exploring' }
                  ]}`;
const replacementTimelines = `options={[
                    { label: t('form.timelines.m3'), value: '0-3m' },
                    { label: t('form.timelines.m6'), value: '3-6m' },
                    { label: t('form.timelines.m12'), value: '6-12m' },
                    { label: t('form.timelines.mplus'), value: '12m+' },
                    { label: t('form.timelines.none'), value: 'none' }
                  ]}`;

content = content.replace(targetIndustries, replacementIndustries);
content = content.replace(targetCompanySizes, replacementCompanySizes);
content = content.replace(targetTimelines, replacementTimelines);

fs.writeFileSync('src/components/AssessmentForm.tsx', content);
console.log('patched form options');
