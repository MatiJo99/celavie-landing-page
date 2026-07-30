import { useEffect, useState } from "react";
import { useLang } from "../LanguageContext";
import site from "../config/site";
import SocialLinks from "./SocialLinks";
import SmartImage from "./SmartImage";
import { GlobeIcon } from "./Icons";

const LINKS = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "location", href: "#location" },
  { id: "contact", href: "#contact" },
];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-brand-bark/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-brand-bark/70 backdrop-blur-sm"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8"
        aria-label="Main"
      >
        {/* ---- Logo slot ---- */}
        <a href="#home" className="flex shrink-0 items-center gap-2.5">
          <SmartImage
            src={site.logo}
            alt="Celavie"
            label="Logo"
            className="h-10 w-10 shrink-0"
            rounded="rounded-full"
            imgClassName="h-full w-full object-contain"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-brand-cream">
            {t("meta.brand")}
          </span>
        </a>

        {/* ---- Desktop links ---- */}
        <ul className="hidden items-center gap-7 md:flex">
          <li>
            <LanguageToggle lang={lang} setLang={setLang} label={t("meta.switchLabel")} />
          </li>
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="font-display text-[15px] text-brand-cream/85 transition hover:text-brand-gold"
              >
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <SocialLinks size="sm" />
        </div>

        {/* ---- Mobile trigger ---- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
          className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-brand-cream/20 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-brand-cream transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-brand-cream transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-brand-cream transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ---- Mobile panel ---- */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-brand-cream/10 bg-brand-bark/98 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        } transition-[max-height] duration-300`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2.5 font-display text-brand-cream/90 transition hover:bg-brand-cream/10"
              >
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
          <li className="mt-3 flex items-center justify-between border-t border-brand-cream/10 pt-4">
            <LanguageToggle lang={lang} setLang={setLang} label={t("meta.switchLabel")} />
            <SocialLinks size="sm" />
          </li>
        </ul>
      </div>
    </header>
  );
}

function LanguageToggle({ lang, setLang, label }) {
  return (
    <div
      className="flex items-center gap-1 rounded-full bg-brand-cream/10 p-1 ring-1 ring-brand-cream/15"
      role="group"
      aria-label={label}
    >
      <GlobeIcon className="ml-1.5 h-4 w-4 text-brand-cream/60" />
      {[
        { code: "en", short: "EN" },
        { code: "am", short: "አማ" },
      ].map(({ code, short }) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            lang === code
              ? "bg-brand-cream text-brand-bark"
              : "text-brand-cream/70 hover:text-brand-cream"
          }`}
        >
          {short}
        </button>
      ))}
    </div>
  );
}
