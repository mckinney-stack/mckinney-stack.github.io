import { useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { IntlProvider } from 'react-intl';
import EnglishMessages from './locales/en.json';
import SlovakMessages from './locales/sk.json';

const languageMessages = {
  en: EnglishMessages,
  sk: SlovakMessages,
};

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');

  function selectLanguage(e) {
    setLocale(e.target.value);
  }

  return (
    <LanguageContext.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={languageMessages[locale]} locale={locale} defaultLocale="en">
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}