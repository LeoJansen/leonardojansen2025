import Image from "next/image";

type AboutDictionary = {
  quoteHtml: string;
  imageAlt: string;
};

type AboutProps = {
  dictionary: AboutDictionary;
};

const About = ({ dictionary }: AboutProps) => {
  return (
    <section id="about" className="flex h-full w-full">
      <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-10 md:flex-row">
        <div className="flex w-full flex-col p-15 md:w-1/2">
          <h3
            className="text-right text-[20px] font-extralight text-[#808080] md:text-[25px] lg:text-[30px] xl:text-[40px]"
            dangerouslySetInnerHTML={{ __html: dictionary.quoteHtml }}
          />
        </div>
        <div className="flex w-full md:w-1/2">
          <div className="relative w-full rounded-l-[350px] bg-gradient-to-l from-[hsl(0,0%,5%)] via-[hsl(0,0%,9%)] to-[hsl(0,0%,5%)] p-[7px] pr-0">
            <div className="h-full w-full overflow-hidden rounded-l-[340px] bg-[#050505] shadow-lg">
              <Image
                src="/assets/leoPic.png"
                alt={dictionary.imageAlt}
                width={928}
                height={1120}
                quality={100}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
