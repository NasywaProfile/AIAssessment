const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

content = content.replace("const { language, setLanguage, t } = useLanguage();", "const { language, setLanguage, t, images } = useLanguage();");
content = content.replace('<img src="/LogoNortis.png"', '<img src={images.logo}');

fs.writeFileSync('src/components/Header.tsx', content);
