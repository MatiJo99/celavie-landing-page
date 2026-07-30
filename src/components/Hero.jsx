import { useLang } from "../LanguageContext";
import site from "../config/site";
import SmartImage from "./SmartImage";
import { PhoneIcon } from "./Icons";

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden rounded-b-3xl bg-hero-roast"
    >
      {/* Oversized brand watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[26vw] font-bold leading-none text-brand-cream/[0.055] lg:text-[18rem]"
      >
        Celavie
      </span>

      {/* Decorative food stickers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <SmartImage
          src={site.accents.burger}
          alt=""
          label="Burger decoration"
          hint="decorative PNG"
          className="absolute left-4 top-24 hidden w-24 rotate-[-30deg] opacity-60 sm:block lg:left-30 lg:top-28 lg:w-50"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-2xl"
        />

        <SmartImage
          src={site.accents.pizzaSlice1}
          alt=""
          label="Pizza decoration"
          hint="decorative PNG"
          className="absolute right-1/2 -translate-x-1/2 -translate-x-[30px] top-20 hidden w-20 rotate-[14deg] opacity-70 sm:block lg:top-28 lg:w-30 float-slow"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />

        <SmartImage
          src={site.accents.chickenWing}
          alt=""
          label="Chicken decoration"
          hint="decorative PNG"
          className="absolute bottom-30 left-50 hidden w-20 rotate-[8deg] opacity-65 md:block lg:left-100 lg:w-40"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />

        <SmartImage
          src={site.accents.fries}
          alt=""
          label="Fries decoration"
          hint="decorative PNG"
          className="absolute bottom-10 right-6 hidden w-20 rotate-[-10deg] opacity-85 md:block lg:right-14 lg:w-30"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8 lg:pb-24 lg:pt-20">
        {/* ---- Copy ---- */}
        <div className="max-w-xl">
          <h1 className="font-display font-medium tracking-tight text-brand-cream">
            <span className="block text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              {t("hero.headlineTop")}
            </span>
            <span className="mt-2 block text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[2.9rem]">
              {t("hero.headlineBottom")}
            </span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-brand-cream/80">
            {t("hero.body")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${site.shortCode}`}
              aria-label={t("hero.ctaAria")}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-brand-blue px-7 py-3.5 font-display text-base font-semibold text-white shadow-lg shadow-brand-blue/30 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-blue-dark hover:shadow-xl hover:shadow-brand-blue/40 active:translate-y-0"
            >
              <PhoneIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              {t("hero.cta")}
            </a>

            <span className="font-display text-sm tracking-wide text-brand-cream/60">
              {t("hero.shortCodeNote")}
            </span>
          </div>
        </div>

        {/* ---- Photo collage ---- */}
        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:max-w-lg">
          {site.heroPhotos.map((photo, i) => (
            <div
              key={photo.src}
              className={`${photo.tilt} ${
                i === 0 ? "lg:-mt-8" : i === 3 ? "lg:mt-6" : ""
              } transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]`}
            >
              <SmartImage
                src={photo.src}
                alt={photo.slot}
                label={photo.slot}
                hint="≈ 520×420"
                className="aspect-[5/4] w-full shadow-tilt ring-4 ring-white/90"
                rounded="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}