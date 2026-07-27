import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
];

export default function LanguageSwitcher({ variant = 'desktop' }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-1">Language</p>
        <div className="grid grid-cols-2 gap-1.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                i18n.language === lang.code
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'text-white/70 bg-white/5 border border-white/5 hover:bg-white/10'
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.native}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-white/80 hover:text-accent transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-white/5"
        aria-label="Change language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span className="text-[11px] font-semibold uppercase tracking-wider">{currentLang.code}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-52 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 z-50 ${
          open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
        }`}
      >
        <div className="p-1.5 max-h-80 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                i18n.language === lang.code
                  ? 'bg-accent/15 text-accent'
                  : 'text-slate-300 hover:text-accent hover:bg-white/5'
              }`}
            >
              <span className="text-base flex-shrink-0">{lang.flag}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold truncate">{lang.native}</span>
                <span className="text-[10px] text-slate-500 truncate">{lang.name}</span>
              </div>
              {i18n.language === lang.code && (
                <svg className="w-3.5 h-3.5 text-accent ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
