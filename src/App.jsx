import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Locations from "./components/Locations";
import Footer from "./components/Footer";
import { useLang } from "./LanguageContext";

export default function App() {
  const { t } = useLang();

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-ink"
      >
        {t("meta.skipToContent")}
      </a>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Locations />
      </main>
      <Footer />
    </>
  );
}
