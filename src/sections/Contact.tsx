type ContactDictionary = {
  heading: string;
  description: string;
  cta: string;
  link: string;
};

type ContactProps = {
  dictionary: ContactDictionary;
};

const Contact = ({ dictionary }: ContactProps) => {
  return (
    <section id="contact" className="flex h-screen w-full items-center justify-center bg-[#000000] px-6 text-center text-gray-100">
      <div className="max-w-3xl space-y-6">
        <h2 className="text-4xl font-semibold">{dictionary.heading}</h2>
        <p className="text-lg text-gray-400">{dictionary.description}</p>
        <div>
          <a
            href={dictionary.link}
            className="inline-flex rounded-md bg-[#7F0098] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#9d19b9]"
          >
            {dictionary.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
