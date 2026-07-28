import { useLang } from "../LanguageContext";
import site from "../config/site";
import SocialLinks from "./SocialLinks";
import { PhoneIcon } from "./Icons";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer id="contact" className="bg-brand-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <h2 className="font-display text-3xl font-medium text-brand-cream lg:text-[2.4rem]">
          {t("footer.heading")}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <dl className="grid gap-7 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-cream/45">
                {t("footer.callCenter")}
              </dt>
              <dd className="mt-2 space-y-1.5">
                {site.callCenter.map((number) => (
                  <a
                    key={number}
                    href={`tel:${number}`}
                    className="block font-display text-[15px] text-brand-cream/90 transition hover:text-brand-gold"
                  >
                    {number}
                  </a>
                ))}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-cream/45">
                {t("footer.email")}
              </dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all font-display text-[15px] text-brand-cream/90 transition hover:text-brand-gold"
                >
                  {site.email}
                </a>
              </dd>

              <dt className="mt-6 text-xs uppercase tracking-wide text-brand-cream/45">
                {t("footer.social")}
              </dt>
              <dd className="mt-3">
                <SocialLinks size="lg" />
              </dd>
            </div>
          </dl>

          {/* Short-code call card — the fastest path to an order. */}
          <a
            href={`tel:${site.shortCode}`}
            className="group flex h-fit items-center gap-4 rounded-2xl bg-brand-blue px-6 py-5 text-white shadow-lg shadow-brand-blue/25 transition hover:-translate-y-0.5 hover:bg-brand-blue-dark"
          >
            <PhoneIcon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
            <span>
              <span className="block text-[11px] uppercase tracking-wide text-white/70">
                {t("footer.shortCode")}
              </span>
              <span className="block font-display text-3xl font-semibold leading-tight">
                {site.shortCode}
              </span>
            </span>
          </a>
        </div>

        <p className="mt-14 border-t border-brand-cream/10 pt-6 text-xs text-brand-cream/40">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
