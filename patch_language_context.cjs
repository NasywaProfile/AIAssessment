const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Replace export const translations with export const defaultTranslations
content = content.replace("export const translations =", "export const defaultTranslations =");

const contextInterfaceRegex = /interface LanguageContextType \{[\s\S]*?\}/;
content = content.replace(contextInterfaceRegex, `interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  updateTranslations: (newTranslations: any) => void;
  translations: any;
  images: Record<string, string>;
  updateImage: (key: string, url: string) => void;
}`);

const providerRegex = /export function LanguageProvider\(\{ children \}: \{ children: ReactNode \}\) \{[\s\S]*?const t = \(key: string\): string => \{/;
content = content.replace(providerRegex, `export const defaultImages = {
  logo: '/LogoNortis.png'
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ID');
  
  const [translationsState, setTranslationsState] = useState(() => {
    const saved = localStorage.getItem('nortis_translations');
    return saved ? JSON.parse(saved) : defaultTranslations;
  });

  const [images, setImages] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('nortis_images');
    return saved ? JSON.parse(saved) : defaultImages;
  });

  const updateTranslations = (newTranslations: any) => {
    setTranslationsState(newTranslations);
    localStorage.setItem('nortis_translations', JSON.stringify(newTranslations));
  };

  const updateImage = (key: string, url: string) => {
    const newImages = { ...images, [key]: url };
    setImages(newImages);
    localStorage.setItem('nortis_images', JSON.stringify(newImages));
  };

  const t = (key: string): string => {`);

const tBodyRegex = /let result: any = translations\[language\];/;
content = content.replace(tBodyRegex, "let result: any = translationsState[language];");

const providerReturnRegex = /<LanguageContext\.Provider value=\{\{ language, setLanguage, t \}\}>/;
content = content.replace(providerReturnRegex, "<LanguageContext.Provider value={{ language, setLanguage, t, updateTranslations, translations: translationsState, images, updateImage }}>");

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
