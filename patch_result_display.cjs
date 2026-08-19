const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentResult.tsx', 'utf8');

// We will add the recommendation text under the readiness level.
content = content.replace(
  '<div className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold uppercase tracking-wider text-center">\n                {submission.readinessLevel}\n              </div>',
  `<div className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold uppercase tracking-wider text-center mb-1">
                {submission.readinessLevel}
              </div>
              <div className="text-[11px] text-slate-500 font-medium text-center">
                Recommendation: <span className="text-slate-800 font-semibold">{submission.readinessDescription}</span>
              </div>`
);

fs.writeFileSync('src/components/AssessmentResult.tsx', content);
