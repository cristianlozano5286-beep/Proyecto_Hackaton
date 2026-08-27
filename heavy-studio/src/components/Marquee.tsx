"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee({
  text,
  reverse,
  speed = 1,
  className = "",
}: {
  text: string;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const tween = gsap.to(track, {
      xPercent: reverse ? 0 : -50,
      duration: 18 / speed,
      ease: "none",
      repeat: -1,
    });

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        gsap.to(tween, { timeScale: 1 + v / 800, overwrite: true });
        if (v < 0) tween.reverse();
        else tween.play();
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [reverse, speed]);

  const items = new Array(8).fill(text);

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap border-y border-black/10 ${className}`}>
      <div ref={trackRef} className="flex w-max" style={{ transform: reverse ? "translateX(-50%)" : undefined }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-6 py-3 text-[22px] md:text-[28px] font-black tracking-[-0.02em] whitespace-nowrap">
            {t} <span className="opacity-20">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
