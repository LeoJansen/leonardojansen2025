import InitialLoader from "@/components/InitialLoader";
import Hero from "@/sections/Hero/Hero";
import Contact from "@/sections/Contact";
import FinalUplink from "@/sections/FinalUplink/index";
import SalesMachines from "@/sections/SalesMachines";
import ResponsiveUnclaimedTerritory from "@/sections/UnclaimedTerritory/ResponsiveUnclaimedTerritory";
import ProjectShowcase from "@/sections/ProjectShowcase";
import type { UnclaimedTerritoryCopy } from "@/sections/UnclaimedTerritory/UnclaimedTerritory";
import type { ProjectShowcaseCopy } from "@/sections/ProjectShowcase/types";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type AppProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const App = ({ dictionary }: AppProps) => {
  const {
    hero,
    contact,
    loader,
    unclaimedTerritory,
    projectShowcase,
    salesMachines,
  } = dictionary;
  const unclaimedTerritoryCopy = unclaimedTerritory as UnclaimedTerritoryCopy;
  const projectShowcaseCopy = projectShowcase as unknown as ProjectShowcaseCopy;

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
      <SalesMachines copy={salesMachines} />
      <ProjectShowcase copy={projectShowcaseCopy} />
      <Contact dictionary={contact} />
      <FinalUplink />
    </InitialLoader>
  );
};

export default App;
