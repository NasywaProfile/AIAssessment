const fs = require('fs');
const content = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf8');

const target = `<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormTextarea 
                id="tujuanAdopsi" 
                label={t('form.aiGoal')}
                placeholder={t('form.aiGoalPlaceholder')}
              />
              <FormTextarea 
                id="usecase" 
                label={t('form.aiUseCase')}
                placeholder={t('form.aiUseCasePlaceholder')}
              />
              <FormTextarea 
                id="penggunaanEksisting" 
                label={t('form.aiCurrentUse')}
                placeholder={t('form.aiCurrentUsePlaceholder')}
                className="md:col-span-2"
              />
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormSelect 
                  id="timeline"`;

const replacement = `<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormTextarea 
                id="tujuanAdopsi" 
                label={t('form.aiGoal')}
                placeholder={t('form.aiGoalPlaceholder')}
                className="md:col-span-2"
              />
              <FormTextarea 
                id="usecase" 
                label={t('form.aiUseCase')}
                placeholder={t('form.aiUseCasePlaceholder')}
                className="md:col-span-2"
              />
              <FormTextarea 
                id="toolsAi" 
                label={t('form.aiTools')}
                placeholder={t('form.aiToolsPlaceholder')}
                className="md:col-span-2"
              />
              <FormTextarea 
                id="penggunaanEksisting" 
                label={t('form.aiCurrentUse')}
                placeholder={t('form.aiCurrentUsePlaceholder')}
                className="md:col-span-2"
              />
              <FormTextarea 
                id="frequentUse" 
                label={t('form.aiFrequentUse')}
                placeholder={t('form.aiFrequentUsePlaceholder')}
                className="md:col-span-2"
              />
              <FormTextarea 
                id="learningNeed" 
                label={t('form.aiLearningNeed')}
                placeholder={t('form.aiLearningNeedPlaceholder')}
                className="md:col-span-2"
              />
              <FormTextarea 
                id="masteryTarget" 
                label={t('form.aiMasteryTarget')}
                placeholder={t('form.aiMasteryTargetPlaceholder')}
                className="md:col-span-2"
              />
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormSelect 
                  id="timeline"`;

if (content.includes(target)) {
  fs.writeFileSync('src/components/AssessmentForm.tsx', content.replace(target, replacement));
  console.log('patched');
} else {
  console.log('target not found');
}
