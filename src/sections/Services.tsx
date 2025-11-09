import ParticleField from "@/components/ParticleField";
import Image from "next/image";

type ServiceItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type ServicesProps = {
  items: ServiceItem[];
};

const Services = ({ items }: ServicesProps) => {
  return (
    <section id="services" className="relative flex h-full w-full ">
     
      <div className="absolute w-full h-full inset-0 bg-gradient-to-b from-[#000000] via-[#00000001] to-[rgba(0,0,0,0)] "/>

      <ParticleField />

      <div className="mt-20 grid h-full w-full grid-cols-2 text-[#979797] z-30 gap-8 ">
        {items.map((service) => (
          <div
            key={service.title}
            className="flex flex-col items-center justify-center w-2/3 border-2 border-[#ac7bb6]"
          >
            <div className="mb-4 flex rounded-lg">
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                width={500}
                height={500}
                className="h-80 w-80 rounded-lg shadow-md"
              />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{service.title}</h2>
            <p className="mt-6 text-lg text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
