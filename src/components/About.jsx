import { useLang } from "../LanguageContext";
import site from "../config/site";
import SmartImage from "./SmartImage";
import { StarIcon } from "./Icons";

export default function About() {
  const { t, tr, content } = useLang();
  const labels = content.about.reviewLabels;

  return (
    <section id="about" className="relative isolate overflow-hidden bg-panel-dark">
      {/* Kitchen photo backdrop, dimmed hard so text stays readable. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <SmartImage
          src={site.aboutBackdrop}
          alt=""
          label="Backdrop photo"
          hint="wide kitchen / food shot, ≈ 1600×900"
          className="h-full w-full opacity-30"
          rounded="rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/75 to-brand-ink/95" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
          <h2 className="shrink-0 font-display text-3xl font-medium text-brand-cream lg:text-[2.1rem]">
            {t("about.heading")}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-cream/85 lg:pt-1.5">
            {t("about.body")}
          </p>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <SmartImage
            src={site.accents.pizzaSlice}
            alt=""
            label="Pizza cut-out"
            hint="transparent PNG"
            className="hidden h-14 w-14 shrink-0 sm:block"
            rounded="rounded-lg"
            imgClassName="h-full w-full object-contain"
          />
          <h3 className="font-display text-xl text-brand-cream/95 lg:text-2xl">
            {t("about.reviewsHeading")}
          </h3>
        </div>

        <ul className="mt-7 grid gap-5 md:grid-cols-2">
          {content.reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} labels={labels} tr={tr} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ReviewCard({ review, labels, tr }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl bg-black/45 p-5 ring-1 ring-brand-cream/10 backdrop-blur-sm transition duration-300 hover:ring-brand-gold/35">
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-blue/85 font-display text-base font-semibold text-white"
        >
          {review.initial}
        </span>

        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-semibold text-brand-cream">
            {review.name}
          </p>
          <p className="truncate text-xs text-brand-cream/55">
            {review.badge && (
              <span className="mr-1.5 rounded bg-brand-cream/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                {tr(review.badge)}
              </span>
            )}
            {tr(review.meta)}
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="flex gap-0.5 text-brand-gold"
          role="img"
          aria-label={`${review.stars} / 5`}
        >
          {Array.from({ length: review.stars }).map((_, i) => (
            <StarIcon key={i} className="h-3.5 w-3.5" />
          ))}
        </span>
        <span className="text-xs text-brand-cream/50">{tr(review.when)}</span>
        {review.context && (
          <span className="text-xs text-brand-cream/40">· {tr(review.context)}</span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-brand-cream/80">{tr(review.body)}</p>

      {review.recommended && (
        <p className="text-xs text-brand-cream/60">
          <span className="text-brand-cream/45">{tr(labels.recommended)}: </span>
          {tr(review.recommended)}
        </p>
      )}

      <dl className="mt-auto flex flex-wrap gap-x-4 gap-y-1 rounded-lg bg-brand-cream/[0.06] px-3 py-2.5 text-xs text-brand-cream/75">
        <Rating label={tr(labels.food)} value={review.ratings.food} />
        <Rating label={tr(labels.service)} value={review.ratings.service} />
        <Rating label={tr(labels.atmosphere)} value={review.ratings.atmosphere} />
      </dl>
    </article>
  );
}

function Rating({ label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <dt className="text-brand-cream/55">{label}</dt>
      <dd className="font-semibold text-brand-cream">{value}</dd>
    </div>
  );
}
