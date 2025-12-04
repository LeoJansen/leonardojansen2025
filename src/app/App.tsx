import InitialLoader from "@/components/InitialLoader";
import Hero from "@/sections/Hero/Hero";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import SalesMachines from "@/sections/SalesMachines";
import ResponsiveUnclaimedTerritory from "@/sections/UnclaimedTerritory/ResponsiveUnclaimedTerritory";
import ProjectShowcase from "@/sections/ProjectShowcase";
import type { UnclaimedTerritoryCopy } from "@/sections/UnclaimedTerritory/UnclaimedTerritory";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type AppProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const App = ({ dictionary }: AppProps) => {
  const { hero, contact, footer, loader, unclaimedTerritory, projectShowcase } = dictionary;
  const unclaimedTerritoryCopy = unclaimedTerritory as UnclaimedTerritoryCopy;

  return (
    <InitialLoader
      copy={{
        message: loader?.tagline ?? "Preparing the experience",
        progressLabel: loader?.progressLabel ?? "Loading portfolio",
        logoAlt: hero.logoAlt,
        greeting: loader?.greeting ?? "Welcome aboard",
      }}
    >
      <Hero dictionary={hero} />
      <ResponsiveUnclaimedTerritory copy={unclaimedTerritoryCopy} />
      <SalesMachines />
      <ProjectShowcase copy={projectShowcase} />
      <Contact dictionary={contact} />
      <Footer dictionary={footer} />
    </InitialLoader>
  );
};

export default App;
