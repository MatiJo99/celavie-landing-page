import { createContext, useContext, useEffect, useMemo, useState } from "react";
import content from "./content/content.json";

const LanguageContext = createContext(null);

const STORAGE_KEY = "celavie-lang";
export const LANGS = ["en", "am"];

/** Walk a dotted path: get(obj, "hero.cta") */
function get(obj, path) {
  return path.split(".").reduce((node, key) => (node ? node[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "am";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
    // First-time visitors get Amharic.
    //return navigator.language?.toLowerCase().startsWith("am") ? "am" : "en";
    return "am";
  });

  /* Setting lang on <html> is what powers every :lang(am) rule in
     index.css — one attribute swaps the whole page's typography. */
  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(() => {
    /** t("hero.cta") -> the string in the active language */
    const t = (path) => {
      const node = get(content, path);
      if (!node) {
        if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${path}`);
        return "";
      }
      if (typeof node === "string") return node;
      return node[lang] ?? node.am ?? node.en ?? "";
    };

    /** tr({en, am}) -> for objects already pulled out of content.json */
    const tr = (node) => {
      if (!node) return "";
      if (typeof node === "string") return node;
      return node[lang] ?? node.am ?? node.en ?? "";
    };

    const toggle = () => setLang((prev) => (prev === "en" ? "am" : "en"));

    return { lang, setLang, toggle, t, tr, content };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
