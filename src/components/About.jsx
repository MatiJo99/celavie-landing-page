import { useRef, useState, useEffect } from "react";
import { useLang } from "../LanguageContext";
import site from "../config/site";
import SmartImage from "./SmartImage";
import { StarIcon, ArrowIcon } from "./Icons";

export default function About() {
  const { t, tr, content } = useLang();
  const labels = content.about.reviewLabels;
  const recipesRef = useRef(null);
  const [currentRecipe, setCurrentRecipe] = useState(0);

  // 1. Dynamic responsive visible count: 1 on mobile, 2 on tablet, 3 on desktop
  const [visibleRecipes, setVisibleRecipes] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleRecipes(1);
      } else if (window.innerWidth < 1024) {
        setVisibleRecipes(2);
      } else {
        setVisibleRecipes(3);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, content.recipes.length - visibleRecipes);

  // Reset index if resizing causes current index to exceed max allowed
  useEffect(() => {
    if (currentRecipe > maxIndex) {
      setCurrentRecipe(maxIndex);
    }
  }, [maxIndex, currentRecipe]);

  // Touchpad horizontal scroll listener
  useEffect(() => {
    const el = recipesRef.current;
    if (!el) return;

    let isCooldown = false;

    const handleWheel = (e) => {
      // Check for horizontal scrolling gesture from trackpad/touchpad
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
        e.preventDefault();
        if (isCooldown) return;

        if (e.deltaX > 0) {
          setCurrentRecipe((prev) => Math.min(prev + 1, maxIndex));
        } else {
          setCurrentRecipe((prev) => Math.max(prev - 1, 0));
        }

        isCooldown = true;
        setTimeout(() => {
          isCooldown = false;
        }, 400); // Debounce trackpad swipe velocity
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [maxIndex]);

  const scrollRecipes = (direction) => {
    const next =
      direction === 1
        ? Math.min(currentRecipe + 1, maxIndex)
        : Math.max(currentRecipe - 1, 0);

    setCurrentRecipe(next);
  };

  // Helper to compute translation percent per responsive step
  const getTransform = () => {
    if (visibleRecipes === 1) {
      return `translateX(calc(-${currentRecipe} * (100% + 24px)))`;
    }
    if (visibleRecipes === 2) {
      return `translateX(calc(-${currentRecipe} * (50% + 12px)))`;
    }
    return `translateX(calc(-${currentRecipe} * (33.333% + 16px)))`;
  };

  return (
    <section id="about" className="relative isolate overflow-hidden bg-panel-dark">
            {/* Decorative icons */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <SmartImage
          src={site.accents.about1}
          alt=""
          label="Burger decoration"
          className="absolute left-20 top-8 hidden w-50 rotate-[-12deg] opacity-35 md:block lg:left-8 lg:top-10"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-2xl"
        />

        <SmartImage
          src={site.accents.about2}
          alt=""
          label="Pizza decoration"
          className="absolute right-30 top-10 hidden w-35 rotate-[14deg] opacity-30 md:block lg:right-8 lg:top-12"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />

        <SmartImage
          src={site.accents.about3}
          alt=""
          label="Chicken decoration"
          className="absolute bottom-8 right-25 hidden w-30 rotate-[8deg] opacity-30 md:block lg:right-10 lg:bottom-12"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-2xl"
        />

        <SmartImage
          src={site.accents.about4}
          alt=""
          label="Fries decoration"
          className="absolute left-1/2 top-1/2 hidden w-40 -translate-x-1/2 -translate-y-1/2 rotate-[6deg] opacity-25 lg:block"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />

        <SmartImage
          src={site.accents.about5}
          alt=""
          label="Burger decoration"
          className="absolute right-15 top-1/2 hidden w-35 rotate-[-20deg] opacity-25 xl:block"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-3xl"
        />

        <SmartImage
          src={site.accents.about6}
          alt=""
          label="Pizza decoration"
          className="absolute left-25 top-1/2 hidden w-40 rotate-[18deg] opacity-25 xl:block"
          imgClassName="h-full w-full object-contain"
          rounded="rounded-2xl"
        />

      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <SmartImage
          src={site.accents.aboutBackdrop}
          alt=""
          label="Backdrop photo"
          hint="wide kitchen / food shot, ≈ 1600×900"
          className="h-full w-full opacity-30"
          imgClassName="h-full w-full object-cover object-center"
          rounded="rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/75 to-brand-ink/95" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
          <h2 className="shrink-0 font-display text-3xl font-medium text-brand-cream lg:text-[2.1rem]">
            {t("about.heading")}
          </h2>
          <p className="max-w-2xl min-h-[96px] text-lg leading-relaxed text-brand-cream/85 lg:pt-1.5">
            {t("about.body")}
          </p>
        </div>

        {/* ================= Recipes Carousel ================= */}
        <div className="mt-14">
          <div>
            <h3 className="font-display text-2xl text-brand-cream">
              {t("about.recipesHeading")}
            </h3>
          </div>

          <div className="mt-8 overflow-hidden">
            <div
              ref={recipesRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: getTransform(),
              }}
            >
              {content.recipes.map((recipe) => {
                const image = site.recipes.find(
                  (item) => item.id === recipe.id
                );

                return (
                  <article
                    key={recipe.id}
                    className="group relative h-72 w-full min-w-full shrink-0 cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-brand-gold/40 sm:w-[calc((100%-24px)/2)] sm:min-w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] lg:min-w-[calc((100%-48px)/3)]"
                  >
                    <SmartImage
                      src={image?.image}
                      alt={tr(recipe.title)}
                      className="h-full w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      rounded="rounded-3xl"
                    />

                    {/* Gradient Overlay with subtle hover shift */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Recipe Information */}
                    <div className="absolute bottom-5 left-5 right-5 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                      <h4 className="font-display text-2xl text-brand-cream transition-colors duration-300 group-hover:text-brand-gold">
                        {tr(recipe.title)}
                      </h4>

                      <p className="mt-1 text-sm text-brand-cream/80 transition-colors duration-300 group-hover:text-brand-cream">
                        {tr(recipe.description)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              disabled={currentRecipe === 0}
              onClick={() => scrollRecipes(-1)}
              aria-label="Previous recipes"
              className={`grid h-11 w-11 place-items-center rounded-full transition ${
                currentRecipe === 0
                  ? "cursor-not-allowed bg-gray-600/50 text-gray-400"
                  : "bg-brand-blue text-white hover:bg-brand-blue-dark"
              }`}
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>

            <button
              disabled={currentRecipe === maxIndex}
              onClick={() => scrollRecipes(1)}
              aria-label="Next recipes"
              className={`grid h-11 w-11 place-items-center rounded-full transition ${
                currentRecipe === maxIndex
                  ? "cursor-not-allowed bg-gray-600/50 text-gray-400"
                  : "bg-brand-blue text-white hover:bg-brand-blue-dark"
              }`}
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-12 max-w-2xl">
            <h3 className="font-display text-3xl text-brand-cream">
              {t("about.whyHeading")}
            </h3>

            <p className="mt-4 text-lg leading-relaxed text-brand-cream/80">
              {t("about.whyBody")}
            </p>
          </div>
        </div>

        {/* ================= Reviews ================= */}
        <div className="mt-16 flex items-center gap-4">
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