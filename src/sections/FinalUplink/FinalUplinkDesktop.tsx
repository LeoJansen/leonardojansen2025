"use client";

import Link from "next/link";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const FinalUplinkDesktop = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const registerItem = (index: number) => (node: HTMLDivElement | null) => {
    if (node) itemsRef.current[index] = node;
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (pulseRef.current) {
        gsap.to(pulseRef.current, {
          scale: 1.05,
          opacity: 0.92,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (sectionRef.current) {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        tl.from(itemsRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.98,
          duration: 1,
          stagger: 0.14,
        });
      }

      if (buttonRef.current) {
        const btn = buttonRef.current;

        const handleMove = (event: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: x * 0.08,
            y: y * 0.08,
            duration: 0.35,
            ease: "power2.out",
          });
        };

        const glow = () => {
          gsap.to(btn, {
            boxShadow: "0 0 45px rgba(147,51,234,0.65)",
            duration: 0.35,
            ease: "power2.out",
          });
        };

        const reset = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.45,
            ease: "power2.out",
          });
        };

        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseenter", glow);
        btn.addEventListener("mouseleave", reset);

        return () => {
          btn.removeEventListener("mousemove", handleMove);
          btn.removeEventListener("mouseenter", glow);
          btn.removeEventListener("mouseleave", reset);
        };
      }

      return undefined;
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="final-uplink"
      ref={sectionRef}
      className="relative isolate overflow-hidden px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <div ref={pulseRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.35),transparent_55%)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.38),transparent_55%)] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),transparent_55%)] mix-blend-screen" />
        <div className="absolute left-1/2 top-0 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),transparent_55%)]" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
        <div ref={registerItem(0)} className="space-y-4">
          <p className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-indigo-100/80">
            Final Uplink
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#9333EA]" aria-hidden />
          </p>

          <h2 className="text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
            A tecnologia complexa fica comigo.
            <br />
            <span className="bg-[linear-gradient(90deg,#c084fc,#a855f7,#6366f1)] bg-clip-text font-bold text-transparent">
              O lucro fica com você.
            </span>
          </h2>
        </div>

        <div ref={registerItem(1)} className="max-w-3xl text-lg text-white/80">
          Pare de depender da sorte nas redes sociais. Vamos construir a estrutura profissional que seu negócio merece.
        </div>

        <div ref={registerItem(2)} className="flex flex-col items-center gap-4">
          <Link
            href="https://wa.me/16893088012"
            target="_blank"
            rel="noreferrer"
            ref={buttonRef}
            className={cn(
              "relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#a855f7]/60 bg-[linear-gradient(120deg,#2b0f3d,#311356,#22113a)] px-9 py-4 text-lg font-semibold uppercase tracking-[0.35em] shadow-[0_0_22px_rgba(147,51,234,0.25)] transition duration-300",
              "hover:border-[#c084fc] hover:bg-[linear-gradient(120deg,#3b1760,#3f1c6e,#2d184a)]"
            )}
          >
            <span
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.45),transparent_55%)] opacity-60 blur-xl"
              aria-hidden
            />
            <span
              className="absolute inset-0 scale-110 bg-[linear-gradient(90deg,rgba(99,102,241,0.32),rgba(147,51,234,0.32),rgba(99,102,241,0.32))] opacity-30"
              aria-hidden
            />
            <MessageCircle className="relative h-6 w-6" strokeWidth={1.5} />
            <span className="relative">INICIAR PROJETO NO WHATSAPP</span>
          </Link>

          <p className="text-sm text-white/70">
            Ou ligue: <span className="font-semibold text-white">+1 (689) 308-8012</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalUplinkDesktop;
