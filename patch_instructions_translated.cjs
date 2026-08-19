const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');

const instructionsDiv = `
        {/* Instructions */}
        <div className="max-w-5xl w-full bg-blue-50/50 rounded-2xl border border-blue-100 p-6 mb-8 text-left">
          <h3 className="text-blue-900 font-bold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            {t('questions.instructionsTitle')}
          </h3>
          <ul className="text-blue-800 text-sm space-y-2 list-disc pl-5">
            {(t('questions.instructions') as any as string[]).map((inst, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: inst.replace('0–5', '<strong>0–5</strong>').replace('key stakeholder', '<strong>key stakeholder</strong>').replace('kondisi nyata', '<strong>kondisi nyata</strong>').replace('current reality', '<strong>current reality</strong>').replace('key stakeholders', '<strong>key stakeholders</strong>') }} />
            ))}
          </ul>
        </div>
        
        {/* Progress Bar & Steps */}`;

content = content.replace(/\{\/\* Instructions \*\/\}[\s\S]*?\{\/\* Progress Bar & Steps \*\/\}/, instructionsDiv);

fs.writeFileSync('src/components/AssessmentQuestions.tsx', content);
