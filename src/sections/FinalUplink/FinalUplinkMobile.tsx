"use client";

import Link from "next/link";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const FinalUplinkMobile = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelectorAll("[data-fade]"), {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="final-uplink" ref={sectionRef} className="relative isolate overflow-hidden px-6 py-20 text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#1c0f2e] via-[#1a1035] to-black"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.3),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-md flex-col gap-6 text-center">
        <div data-fade className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Final Uplink</p>
          <h2 className="text-3xl font-semibold leading-tight">
            A tecnologia complexa fica comigo.
            <br />
            <span className="font-bold text-[#c084fc]">O lucro fica com você.</span>
          </h2>
        </div>

        <p data-fade className="text-base leading-relaxed text-white/75">
          Pare de depender da sorte nas redes sociais. Vamos construir a estrutura profissional que seu negócio merece.
        </p>

        <div data-fade className="space-y-3">
          <Link
            href="https://wa.me/16893088012"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#7c3aed] px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] shadow-[0_15px_45px_rgba(124,58,237,0.35)] transition duration-200 hover:bg-[#8b5cf6] active:translate-y-[1px]"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
            INICIAR PROJETO NO WHATSAPP
          </Link>

          <p className="text-sm text-white/70">
            Ou ligue: <span className="font-semibold text-white">+1 (689) 308-8012</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalUplinkMobile;
