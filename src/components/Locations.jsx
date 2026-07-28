import { useLang } from "../LanguageContext";
import site from "../config/site";
import { PinIcon, ArrowIcon } from "./Icons";

export default function Locations() {
  const { t, tr, content } = useLang();
  const branchCopy = content.locations.branches;

  return (
    <section id="location" className="bg-brand-crust">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-medium text-brand-cream lg:text-[2.4rem]">
            {t("locations.heading")}
          </h2>
          <p className="text-sm text-brand-cream/60">{t("locations.subheading")}</p>
        </div>

        <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.branches.map((branch) => {
            const copy = branchCopy[branch.id];
            const name = tr(copy?.name);

            return (
              <li
                key={branch.id}
                className="group overflow-hidden rounded-2xl bg-black/30 ring-1 ring-brand-cream/10 transition duration-300 hover:ring-brand-gold/40"
              >
                {/* Embedded Map Container */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-brand-crust/50">
                  {branch.embedUrl ? (
                    <iframe
                      title={`Map location for ${name}`}
                      src={branch.embedUrl}
                      className="h-full w-full border-0 transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-brand-cream/40">
                      Map preview unavailable
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-1.5 font-display text-lg font-medium text-brand-cream">
                      <PinIcon className="h-4 w-4 shrink-0 text-brand-gold" />
                      <span className="truncate">{name}</span>
                    </h3>
                    <p className="mt-0.5 text-xs text-brand-cream/55">{tr(copy?.note)}</p>
                  </div>

                  {branch.mapUrl ? (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-blue-dark"
                    >
                      {t("locations.directions")}
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span
                      className="shrink-0 rounded-lg bg-brand-cream/10 px-3 py-2 text-xs text-brand-cream/45"
                      title="Add mapUrl in src/config/site.js"
                    >
                      {t("footer.linkPending")}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}