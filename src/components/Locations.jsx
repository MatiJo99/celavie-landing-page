import { useLang } from "../LanguageContext";
import site from "../config/site";
import SmartImage from "./SmartImage";
import { PinIcon, ArrowIcon } from "./Icons";

export default function Locations() {
  const { t, tr, content } = useLang();
  const branchCopy = content.locations.branches;

  return (
    <section id="location" className="relative isolate overflow-hidden bg-brand-crust">
      {/* Decorative icons */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <SmartImage
          src={site.accents.burger1}
          alt=""
          label="Burger decoration"
          className="absolute left-30 top-10 hidden w-30 rotate-[-12deg] opacity-35 md:block float-slow"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />

        <SmartImage
          src={site.accents.juice}
          alt=""
          label="Pizza decoration"
          className="absolute right-40 top-24 hidden w-30 rotate-[18deg] opacity-45 md:block"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />

        <SmartImage
          src={site.accents.fries1}
          alt=""
          label="Fries decoration"
          className="absolute bottom-5 left-1/2 hidden w-40 -translate-x-1/2 rotate-[8deg] opacity-30 lg:block"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-2xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-medium text-brand-cream lg:text-[2.4rem]">
            {t("locations.heading")}
          </h2>
          <p className="text-sm text-brand-cream/60">{t("locations.subheading")}</p>
        </div>

        <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.branches.map((branch) => {
            const copy = branchCopy[branch.id];
            const name = tr(copy?.name);

            return (
              <li
                key={branch.id}
                className="group overflow-hidden rounded-2xl bg-black/30 ring-1 ring-brand-cream/10 transition duration-300 hover:ring-brand-gold/40"
              >
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