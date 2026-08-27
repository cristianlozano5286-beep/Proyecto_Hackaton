"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/work", label: "WORK", count: "06" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 transition-all ${
          scrolled ? "bg-[#0B0C12]/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 text-[15px] font-black tracking-[-0.02em]">
          <span className="w-7 h-7 rounded-full bg-[#F5ED32] grid place-items-center text-black text-[11px]">◼</span>
          HEAVY
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.12em] font-semibold">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#F5ED32] transition-colors flex items-center gap-1">
              {l.label} {l.count && <span className="text-[9px] opacity-60">({l.count})</span>}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-white text-black grid place-items-center text-[11px] font-bold hover:bg-[#F5ED32] transition-colors"
          aria-label="Menu"
        >
          {open ? "✕" : "≡"}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#F5ED32] text-black flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-[clamp(44px,9vw,120px)] font-black leading-[0.85] tracking-[-0.04em] hover:italic transition-all border-b border-black/10 py-4 flex justify-between items-end"
                  >
                    {l.label}
                    <span className="text-[14px] font-mono font-normal tracking-[0.2em]">0{i + 1} —→</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-wrap gap-3 text-[11px] tracking-[0.1em] font-semibold"
              >
                <a href="#" className="px-4 py-2 rounded-full border border-black">INSTAGRAM</a>
                <a href="#" className="px-4 py-2 rounded-full border border-black">BEHANCE</a>
                <a href="#" className="px-4 py-2 rounded-full border border-black">VIMEO</a>
                <a href="mailto:hello@heavy.studio" className="px-4 py-2 rounded-full bg-black text-white">HELLO@HEAVY.STUDIO</a>
              </motion.div>
            </div>
            <div className="px-6 md:px-12 py-6 flex justify-between text-[10px] tracking-[0.2em] font-mono opacity-60">
              <span>© 2026 HEAVY STUDIO</span>
              <span>BUENOS AIRES — BERLIN — TOKYO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
