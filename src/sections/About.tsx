import ParticleField from "@/components/ParticleField";
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
    <section id="about" className="relative flex h-full w-full ">
        <ParticleField count={4} />
      <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-10 md:flex-row  z-40">
        <div className="flex w-full flex-col p-15 md:w-1/2">
          <h3
            className="text-right text-[20px] tracking-wide font-extralight text-[#b1a8b0] md:text-[25px] lg:text-[30px] xl:text-[40px]"
            dangerouslySetInnerHTML={{ __html: dictionary.quoteHtml }}
          />
        </div>
        <div className="flex w-full md:w-1/2">
          <div className="relative w-full rounded-l-[350px] bg-gradient-to-l from-[hsl(300,100%,2%)] via-[hsl(300,100%,4%)] to-[hsl(278,100%,8%)] p-[6px] pr-0">
            <div className="h-full w-full overflow-hidden rounded-l-[340px] bg-[#210024] shadow-lg">
              <Image
                src="/assets/leo-picture.png"
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
