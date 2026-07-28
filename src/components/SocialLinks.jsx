import { InstagramIcon, FacebookIcon, TikTokIcon } from "./Icons";
import site from "../config/site";
import { useLang } from "../LanguageContext";

const NETWORKS = [
  { key: "instagram", name: "Instagram", Icon: InstagramIcon, tone: "hover:bg-[#d62976]" },
  { key: "facebook", name: "Facebook", Icon: FacebookIcon, tone: "hover:bg-[#1877f2]" },
  { key: "tiktok", name: "TikTok", Icon: TikTokIcon, tone: "hover:bg-[#010101]" },
];

/**
 * size: "sm" for the navbar, "lg" for the footer.
 * A network with an empty URL in config/site.js still shows, but is
 * marked as pending rather than linking nowhere.
 */
export default function SocialLinks({ size = "sm", className = "" }) {
  const { t } = useLang();

  const box = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const glyph = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {NETWORKS.map(({ key, name, Icon, tone }) => {
        const url = site.social[key];

        const shared = `${box} grid place-items-center rounded-full bg-brand-cream/10 text-brand-cream ring-1 ring-brand-cream/15 transition duration-200`;

        if (!url) {
          return (
            <li key={key}>
              <span
                className={`${shared} cursor-not-allowed opacity-45`}
                title={`${name} — ${t("footer.linkPending")}`}
                aria-label={`${name} — ${t("footer.linkPending")}`}
              >
                <Icon className={glyph} />
              </span>
            </li>
          );
        }

        return (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className={`${shared} ${tone} hover:-translate-y-0.5 hover:text-white hover:ring-white/30`}
            >
              <Icon className={glyph} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
