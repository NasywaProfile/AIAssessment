const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');

// Add useEffect import if not there
if (!content.includes('useEffect')) {
  content = content.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';"
  );
}

// Add the initial scroll to top
content = content.replace(
  "const [answers, setAnswers] = useState<Record<string, number>>({});",
  "const [answers, setAnswers] = useState<Record<string, number>>({});\n\n  useEffect(() => {\n    window.scrollTo({ top: 0, behavior: 'smooth' });\n  }, []);"
);

fs.writeFileSync('src/components/AssessmentQuestions.tsx', content);
