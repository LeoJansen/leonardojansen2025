import Topbar from "@/sections/Topbar";
import Hero from "@/sections/Hero/Hero";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Clients from "@/sections/Clients/Clients";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import GithubStats from "@/sections/GithubStats/GithubStats";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type AppProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const App = ({ locale, dictionary }: AppProps) => {
  const {
    navigation,
    hero,
    services,
    about,
    clients,
    githubStats,
    contact,
    footer,
  } = dictionary;

  return (
    <div className="relative bg-[#000000]">
      <Topbar
        items={navigation.items}
        currentLocale={locale}
        localeLabels={navigation.localeSwitcher.labels}
        ariaLabel={navigation.localeSwitcher.ariaLabel}
      />
      <Hero dictionary={hero} />
       
      <Services items={services.items} />
       
  <GithubStats dictionary={githubStats} locale={locale} />
      <About dictionary={about} />
      <Clients
        heading={clients.heading}
        intro={clients.intro}
        viewProjectLabel={clients.viewProject}
        sourceCodeLabel={clients.sourceCode}
        projects={clients.projects}
      />
     
      <Contact dictionary={contact} />
      <Footer dictionary={footer} />
    </div>
  );
};

export default App;
