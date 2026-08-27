"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/components/Marquee";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".hero-line", {
        y: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        delay: 1.6,
      });
      gsap.from(".hero-float", {
        y: 30,
        rotation: -6,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 1.9,
      });

      // Parallax hero
      gsap.to(".hero-parallax", {
        y: -120,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Reveal featured
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });

      // Stats counter
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.value || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
        });
      });

      // Image scale on scroll
      gsap.utils.toArray<HTMLElement>(".img-scale").forEach((img) => {
        gsap.from(img, {
          scale: 1.12,
          scrollTrigger: {
            trigger: img,
            start: "top 95%",
            end: "top 40%",
            scrub: 1,
          },
        });
      });

      // Horizontal pin for projects
      const hSection = document.querySelector(".h-pin");
      if (hSection) {
        gsap.to(".h-track", {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: hSection,
            start: "top top",
            end: "+=120%",
            scrub: 1,
            pin: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0B0C12] text-[#F5F2EA] overflow-x-hidden">
      {/* HERO 100vh */}
      <section ref={heroRef} className="relative min-h-[100vh] flex flex-col justify-center px-4 md:px-6 pt-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex justify-between text-[10px] tracking-[0.18em] font-mono opacity-40 mb-6">
            <span>EST. 2018 — BUENOS AIRES / BERLIN</span>
            <span className="hidden md:inline">SCROLL ↓</span>
            <span>WE TURN IDEAS INTO MOTION</span>
          </div>

          <h1 className="text-hero font-black leading-[0.82] tracking-[-0.05em]">
            <div className="overflow-hidden">
              <div className="hero-line">WE MAKE</div>
            </div>
            <div className="overflow-hidden flex items-center gap-4">
              <div className="hero-line text-[#F5ED32]">LOUD</div>
              <span className="hero-float hidden md:inline-flex w-14 h-14 rounded-full bg-[#F28CCB] items-center justify-center text-black text-[10px] leading-none text-center font-mono">
                PLAY
                <br />
                REEL
              </span>
              <div className="hero-line">STORIES</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line flex items-center gap-3">
                THAT <span className="font-serif italic font-normal tracking-[-0.03em] text-[#8DFF68]">move</span>
              </div>
            </div>
          </h1>

          <div className="mt-8 grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
            <div className="hero-float flex items-center gap-3 text-[11px] tracking-[0.12em] font-semibold">
              <span className="w-8 h-8 rounded-full bg-white text-black grid place-items-center">↘</span>
              SCROLL TO EXPLORE — 2026 SHOWREEL
            </div>
            <p className="hero-line text-[13px] leading-relaxed opacity-70 max-w-[420px] font-light">
              Somos un estudio creativo de animación, CGI y dirección de arte. No hacemos videos, hacemos piezas que se quedán en la cabeza.
            </p>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="hero-parallax absolute inset-0 pointer-events-none -z-0">
          <div className="hero-float absolute right-[8%] top-[22%] w-20 h-20 rounded-[18px] bg-[#4C7DFF] rotate-12 hidden md:block" />
          <div className="hero-float absolute left-[6%] bottom-[18%] w-16 h-16 rounded-full bg-[#FF7347] hidden md:block" />
          <div className="hero-float absolute right-[28%] bottom-[12%] w-28 h-7 rounded-full bg-[#F5ED32] rotate-12 hidden md:block" />
          <svg className="hero-float absolute right-[18%] top-[36%] w-32 h-32 hidden lg:block" viewBox="0 0 100 100">
            <path d="M20 50 Q 50 10 80 50 Q 50 90 20 50" fill="none" stroke="#F28CCB" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="3" fill="#F28CCB" />
          </svg>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="w-[1px] h-10 bg-white/20" />
          <span className="text-[9px] tracking-[0.2em] font-mono">SCROLL</span>
        </div>
      </section>

      {/* FEATURED WORK - editorial asymmetric */}
      <section ref={featuredRef} className="bg-[#F5F2EA] text-[#0B0C12] px-4 md:px-6 py-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end border-b border-black/10 pb-4 mb-8">
            <h2 className="text-[11px] tracking-[0.18em] font-bold">FEATURED WORK — 2024/2026</h2>
            <Link href="/work" className="text-[11px] tracking-[0.12em] font-bold hover:italic">
              VIEW ALL (06) →
            </Link>
          </div>

          <div className="grid md:grid-cols-12 gap-4 md:gap-6">
            {/* Project 01 huge left */}
            <Link
              href={`/work/${projects[0].slug}`}
              data-cursor="VIEW"
              className="reveal md:col-span-7 group relative overflow-hidden bg-black"
            >
              <div className="aspect-[4/2.8] overflow-hidden">
                <Image src={projects[0].cover} alt={projects[0].title} width={900} height={650} className="img-scale w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <p className="text-[10px] tracking-[0.14em] font-mono opacity-70">
                  {projects[0].client} • {projects[0].category} • {projects[0].year}
                </p>
                <h3 className="text-[32px] md:text-[44px] font-black leading-[0.85] tracking-[-0.03em] whitespace-pre">{projects[0].title}</h3>
              </div>
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5ED32] grid place-items-center text-[10px]">↗</span>
            </Link>

            {/* Project 02 vertical right */}
            <Link
              href={`/work/${projects[1].slug}`}
              data-cursor="VIEW"
              className="reveal md:col-span-5 group relative overflow-hidden bg-[#F5ED32]"
            >
              <div className="aspect-[3/4] md:aspect-[4/5.2] overflow-hidden">
                <Image src={projects[1].cover} alt={projects[1].title} width={700} height={900} className="img-scale w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <p className="text-[10px] tracking-[0.14em] font-mono opacity-70">
                  {projects[1].client} • {projects[1].year}
                </p>
                <h3 className="text-[28px] md:text-[36px] font-black leading-[0.9] whitespace-pre">{projects[1].title}</h3>
              </div>
            </Link>

            {/* Project 03 horizontal */}
            <Link href={`/work/${projects[2].slug}`} data-cursor="VIEW" className="reveal md:col-span-5 group relative overflow-hidden bg-[#F28CCB]">
              <div className="aspect-[4/3] overflow-hidden">
                <Image src={projects[2].cover} alt={projects[2].title} width={700} height={500} className="img-scale w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="text-[10px] tracking-[0.14em] font-mono"> {projects[2].client} • {projects[2].year}</p>
                <h3 className="text-[26px] font-black whitespace-pre">{projects[2].title}</h3>
              </div>
            </Link>

            {/* Project 04 asymmetric */}
            <Link href={`/work/${projects[3].slug}`} data-cursor="VIEW" className="reveal md:col-span-7 group relative overflow-hidden bg-[#4C7DFF]">
              <div className="aspect-[16/9] overflow-hidden">
                <Image src={projects[3].cover} alt={projects[3].title} width={900} height={500} className="img-scale w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white md:p-6">
                <p className="text-[10px] tracking-[0.14em] font-mono opacity-80">{projects[3].client} • {projects[3].year}</p>
                <h3 className="text-[30px] md:text-[38px] font-black whitespace-pre">{projects[3].title}</h3>
              </div>
            </Link>
          </div>

          {/* Remaining two */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
            {[projects[4], projects[5]].map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} data-cursor="VIEW" className="reveal group relative overflow-hidden bg-black">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image src={p.cover} alt={p.title} width={700} height={440} className="img-scale w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <p className="text-[10px] tracking-[0.14em] font-mono opacity-70">{p.client} • {p.year}</p>
                  <h3 className="text-[24px] font-black whitespace-pre">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#F5ED32] text-black">
        <Marquee text="ANIMATION • DESIGN • MOTION • STORIES • CGI • 3D • BRAND FILMS" speed={1.1} />
        <Marquee text="HEAVY STUDIO • WE MAKE LOUD STORIES • HEAVY STUDIO • WE MAKE LOUD STORIES" reverse speed={1} className="bg-black text-white border-white/20" />
      </div>

      {/* ABOUT - HEY! editorial */}
      <section className="bg-[#F5F2EA] text-[#0B0C12] px-4 md:px-6 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div>
              <p className="text-[11px] tracking-[0.2em] font-bold">HEY!</p>
              <h2 className="reveal text-display font-black tracking-[-0.03em] leading-[0.85] mt-2">
                WE ARE <span className="font-serif italic font-normal">HEAVY</span>
                <br />
                A <span className="bg-[#F5ED32] px-2">LOUD</span> STUDIO
              </h2>
              <div className="reveal mt-6 flex gap-3 text-[10px] tracking-[0.12em] font-mono">
                <span className="px-3 py-1 rounded-full border border-black">2018 — 2026</span>
                <span className="px-3 py-1 rounded-full bg-black text-white">8 YEARS LOUD</span>
              </div>
            </div>
            <div className="reveal">
              <p className="text-[18px] md:text-[22px] leading-relaxed font-light">
                Somos un estudio creativo especializado en <span className="font-bold">animación, motion graphics, CGI, dirección de arte</span> e historias visuales que no piden permiso para existir.
              </p>
              <p className="mt-4 text-[13px] leading-relaxed opacity-70">
                No hacemos contenido. Hacemos piezas de museo que funcionan en TikTok. Cada frame está diseñado para detener el scroll y quedarse en la memoria. Visualmente ruidosos, narrativamente precisos.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-black/10 pt-6">
                <div>
                  <p className="text-[10px] tracking-[0.15em] font-bold">WHO WE ARE</p>
                  <p className="text-[12px] opacity-70 mt-1 leading-relaxed">12 mentes, 3 ciudades, 1 obsesión: que cada proyecto se sienta como estreno.</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] font-bold">WHAT WE DO</p>
                  <p className="text-[12px] opacity-70 mt-1 leading-relaxed">De la idea al master final, sin intermediarios que diluyan la locura.</p>
                </div>
                <div className="hidden md:block">
                  <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="team" width={300} height={200} className="rounded-xl object-cover w-full h-28" />
                </div>
              </div>
            </div>
          </div>

          {/* WHAT WE DO services */}
          <div className="mt-12 border-t border-black/10 pt-8">
            <p className="text-[11px] tracking-[0.2em] font-bold mb-6">WHAT WE DO — SERVICES</p>
            <div className="grid md:grid-cols-2 gap-2 text-[15px] font-medium">
              {[
                "Creative Direction",
                "Art Direction",
                "2D Animation",
                "3D Animation",
                "CGI",
                "Motion Graphics",
                "Illustration",
                "Brand Films",
                "Explainer Videos",
                "Interactive Experiences",
              ].map((s, i) => (
                <div key={s} className="reveal flex justify-between items-center py-3 border-b border-black/10">
                  <span className="tracking-[-0.01em]">{s}</span>
                  <span className="text-[10px] font-mono opacity-40">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS GONE WILD */}
      <section className="bg-[#0B0C12] text-[#F5F2EA] px-4 md:px-6 py-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
            <h2 className="text-display font-black tracking-[-0.03em]">
              PROCESS
              <br />
              <span className="text-[#F5ED32]">GONE WILD</span>
            </h2>
            <p className="text-[11px] tracking-[0.15em] font-mono opacity-50 max-w-[320px]">8 pasos. 0 atajos. Cada etapa es una performance visual.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { n: "01", t: "BRIEF", d: "Escuchamos hasta el ruido entre líneas." },
              { n: "02", t: "IDEA", d: "Lluvia de ideas sin paraguas." },
              { n: "03", t: "SCRIPT", d: "Cada palabra tiene ritmo." },
              { n: "04", t: "STORYBOARD", d: "Dibujamos la película antes de filmarla." },
              { n: "05", t: "DESIGN", d: "Pixel con intención." },
              { n: "06", t: "ANIMATION", d: "Donde la magia hace crunch." },
              { n: "07", t: "SOUND", d: "El 50% de lo que sientes." },
              { n: "08", t: "DELIVERY", d: "Entregamos y celebramos fuerte." },
            ].map((s) => (
              <div key={s.n} className="reveal group border border-white/10 rounded-2xl p-5 hover:bg-white hover:text-black transition-colors">
                <div className="text-[48px] font-black leading-none tracking-[-0.04em] opacity-20 group-hover:opacity-100 transition-opacity">{s.n}</div>
                <h3 className="text-[14px] font-black tracking-[-0.01em] mt-2">{s.t}</h3>
                <p className="text-[11px] opacity-60 mt-1 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#8DFF68] text-black px-4 md:px-6 py-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/10 pt-8">
          {[
            { n: "50", label: "PROJECTS", sub: "and counting" },
            { n: "20", label: "CLIENTS", sub: "loud brands" },
            { n: "12", label: "COUNTRIES", sub: "screens worldwide" },
            { n: "8", label: "YEARS", sub: "making noise" },
          ].map((s) => (
            <div key={s.label} className="reveal">
              <div className="text-[64px] md:text-[84px] font-black leading-none tracking-[-0.04em] flex items-baseline gap-1">
                <span className="stat-num" data-value={s.n}>
                  0
                </span>
                <span className="text-[24px]">+</span>
              </div>
              <p className="text-[11px] tracking-[0.18em] font-bold">{s.label}</p>
              <p className="text-[10px] tracking-[0.12em] font-mono opacity-60">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="bg-[#F5F2EA] text-black px-4 md:px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.2em] font-bold text-center">TRUSTED BY LOUD BRANDS</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3 text-[11px] font-black tracking-[-0.01em]">
            {["VECTOR", "NEON LABS", "ORBITAL", "TERRA", "MINDSCAPE", "NOCTURNE", "HYPER", "VOLTA", "NOVA", "AXIOM"].map((b, i) => (
              <span key={b} className="reveal px-4 py-2 rounded-full border border-black/10 bg-white" style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
                {b}
              </span>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-3 text-[10px] tracking-[0.12em] font-mono opacity-60 border-t border-black/10 pt-6">
            <span>AWARDS — AWWWARDS SOTD ×3 • FWA ×2 • CSSDA</span>
            <span className="md:text-center">12 COUNTRIES — SCREENS WORLDWIDE</span>
            <span className="md:text-right">BUENOS AIRES — BERLIN — TOKYO</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5ED32] text-black px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="reveal text-hero font-black tracking-[-0.04em] leading-[0.82]">
            LET&apos;S MAKE
            <br />
            SOMETHING
            <br />
            <span className="font-serif italic font-normal">LOUD.</span>
          </h2>
          <div className="reveal mt-8 flex flex-wrap gap-4 items-center">
            <Link href="/contact" data-cursor="CLICK" className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-black text-white text-[12px] tracking-[0.12em] font-bold hover:bg-[#0B0C12] transition-colors">
              START A PROJECT
              <span className="w-6 h-6 rounded-full bg-white text-black grid place-items-center group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <span className="text-[11px] tracking-[0.12em] font-mono opacity-60">hello@heavy.studio • +54 11 1234 5678</span>
          </div>
        </div>
      </section>
    </div>
  );
}
