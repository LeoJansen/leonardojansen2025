import InitialLoader from "@/components/InitialLoader";
import Hero from "@/sections/Hero/Hero";
import Clients from "@/sections/Clients/Clients";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type AppProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const App = ({ dictionary }: AppProps) => {
  const { hero, clients, contact, footer, loader } = dictionary;

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
      <Clients
        heading={clients.heading}
        intro={clients.intro}
        viewProjectLabel={clients.viewProject}
        sourceCodeLabel={clients.sourceCode}
        projects={clients.projects}
      />
      <Contact dictionary={contact} />
      <Footer dictionary={footer} />
    </InitialLoader>
  );
};

export default App;
