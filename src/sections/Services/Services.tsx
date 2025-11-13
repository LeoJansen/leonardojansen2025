'use client';

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
    <section id="services" className="relative flex h-full w-full">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via-[#00000001] to-[rgba(0,0,0,0)]" />

      <ParticleField />

      <div className="mt-20 grid h-full w-full grid-cols-2 justify-items-center gap-[5%] p-[5%] text-[#979797]">
        {items.map((service) => (
          <div
            key={service.title}
            className="relative aspect-[4/3] flex items-end w-full overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />

            <div className="relative z-10 flex flex-col items-center justify-end gap-4 px-10 pb-10 text-center  backdrop-blur-sm bg-[rgba(0,0,0,0.3)] ">
              <h2 className="text-2xl font-semibold text-shadow-2xs text-[#F5FFE3]">{service.title}</h2>
              <p className="text-lg  text-[#F5FFE3] ">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
