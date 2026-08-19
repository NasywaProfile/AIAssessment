const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Replace Indonesian
content = content.replace("level1: 'Level 1 - Initial',", "level1: 'AI-Unready',");
content = content.replace("level2: 'Level 2 - Managed',", "level2: 'AI-Aware',");
content = content.replace("level3: 'Level 3 - Defined',", "level3: 'AI-Ready',");
content = content.replace("level4: 'Level 4 - Quantitatively Managed',", "level4: 'AI-Enabled',");
content = content.replace("level5: 'Level 5 - Optimizing',", "level5: 'AI-Mature',");

// Replace English
content = content.replace("level1: 'Level 1 - Initial',", "level1: 'AI-Unready',");
content = content.replace("level2: 'Level 2 - Managed',", "level2: 'AI-Aware',");
content = content.replace("level3: 'Level 3 - Defined',", "level3: 'AI-Ready',");
content = content.replace("level4: 'Level 4 - Quantitatively Managed',", "level4: 'AI-Enabled',");
content = content.replace("level5: 'Level 5 - Optimizing',", "level5: 'AI-Mature',");

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
