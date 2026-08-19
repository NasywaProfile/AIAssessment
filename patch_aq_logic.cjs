const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');

const oldLogic = `      let readinessLevel = 'Level 1 - Initial';
      let readinessDesc = 'Ad hoc activities, no clear structure.';
      if (overallScore > 1.5 && overallScore <= 2.5) {
        readinessLevel = 'Level 2 - Managed';
        readinessDesc = 'Processes are somewhat managed but inconsistent.';
      } else if (overallScore > 2.5 && overallScore <= 3.5) {
        readinessLevel = 'Level 3 - Defined';
        readinessDesc = 'Standardized and defined processes are in place.';
      } else if (overallScore > 3.5 && overallScore <= 4.5) {
        readinessLevel = 'Level 4 - Quantitatively Managed';
        readinessDesc = 'Processes are measured and controlled.';
      } else if (overallScore > 4.5) {
        readinessLevel = 'Level 5 - Optimizing';
        readinessDesc = 'Continuous improvement and optimization.';
      }`;

const newLogic = `      let readinessLevel = 'AI-Unready';
      let readinessDesc = 'AI Literacy + Awareness';
      if (overallScore > 1.5 && overallScore <= 2.5) {
        readinessLevel = 'AI-Aware';
        readinessDesc = 'Readiness Program';
      } else if (overallScore > 2.5 && overallScore <= 3.5) {
        readinessLevel = 'AI-Ready';
        readinessDesc = 'Implementation Pilot';
      } else if (overallScore > 3.5 && overallScore <= 4.5) {
        readinessLevel = 'AI-Enabled';
        readinessDesc = 'Scaling & Retainer';
      } else if (overallScore > 4.5) {
        readinessLevel = 'AI-Mature';
        readinessDesc = 'Strategic Advisory';
      }`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/AssessmentQuestions.tsx', content);
