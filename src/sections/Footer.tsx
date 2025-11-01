type FooterDictionary = {
  text: string;
};

type FooterProps = {
  dictionary: FooterDictionary;
};

const Footer = ({ dictionary }: FooterProps) => {
  const year = new Date().getFullYear().toString();
  const text = dictionary.text.replace("{{year}}", year);

  return (
    <footer className="flex h-24 w-full items-center justify-center bg-[#000000] text-sm text-gray-500">
      {text}
    </footer>
  );
};

export default Footer;
