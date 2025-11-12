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
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg    shadow-md"
          >
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-end gap-4 p-12 text-center text-gray-100">
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="text-lg text-gray-200/90">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
