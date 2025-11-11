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

      <div className="mt-20 grid h-full w-full grid-cols-2 justify-items-center gap-8 text-[#979797]">
        {items.map((service, index) => (
          <div
            key={service.title}
         
            className="*:"
          >
            <div
              className="flex-col items-center justify-center bg-transparent p-16"
            >
              <div className="mb-4 flex">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  width={500}
                  height={500}
                  className="h-[450px] w-[450px] rounded-lg shadow-md"
                />
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{service.title}</h2>
              <p className="mt-6 text-lg text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
