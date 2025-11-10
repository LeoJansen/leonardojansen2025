'use client';

import ParticleField from "@/components/ParticleField";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Services.module.css";

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
  const borderRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const elements = borderRefs.current.filter(
      (element): element is HTMLDivElement => element !== null,
    );

    if (!elements.length) {
      return;
    }

    const tweens = elements.map((element, index) => {
      gsap.set(element, { "--gradient-angle": `${(index * 60) % 360}deg` });

      return gsap.to(element, {
        duration: 5,
        repeat: -1,
        ease: "easeInOut",
        "--gradient-angle": "+=360deg",
      } as gsap.TweenVars);
    });

    return () => {
      tweens.forEach((tween) => tween?.kill());
    };
  }, [items.length]);

  return (
    <section id="services" className="relative flex h-full w-full">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via-[#00000001] to-[rgba(0,0,0,0)]" />

      <ParticleField />

      <div className="mt-20 grid h-full w-full grid-cols-2 justify-items-center gap-8 text-[#979797]">
        {items.map((service, index) => (
          <div
            key={service.title}
            ref={(element) => {
              borderRefs.current[index] = element;
            }}
            className={`${styles.gradientBorder} w-2/3`}
          >
            <div
              className={`${styles.gradientBorderContent} flex flex-col items-center justify-center bg-transparent p-16`}
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
