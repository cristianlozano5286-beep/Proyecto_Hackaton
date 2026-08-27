"use client";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-[#F5ED32] text-black min-h-screen pt-20">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
        <h1 className="text-[clamp(44px,10vw,130px)] font-black leading-[0.8] tracking-[-0.04em]">
          HAVE A<br />
          PROJECT?
          <br />
          <span className="font-serif italic font-normal">LET&apos;S TALK.</span>
        </h1>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 mt-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
            }}
            className="space-y-3"
          >
            <div className="grid md:grid-cols-2 gap-3">
              <input required placeholder="Name *" className="px-4 py-3 rounded-full border border-black bg-white text-[13px] outline-none" />
              <input required type="email" placeholder="Email *" className="px-4 py-3 rounded-full border border-black bg-white text-[13px] outline-none" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Company" className="px-4 py-3 rounded-full border border-black bg-white text-[13px] outline-none" />
              <select className="px-4 py-3 rounded-full border border-black bg-white text-[13px] outline-none">
                <option>Project type</option>
                <option>Brand Film</option>
                <option>CGI Campaign</option>
                <option>Explainer</option>
                <option>Interactive</option>
              </select>
            </div>
            <select className="w-full px-4 py-3 rounded-full border border-black bg-white text-[13px] outline-none">
              <option>Budget</option>
              <option>$10k — $25k</option>
              <option>$25k — $60k</option>
              <option>$60k+</option>
            </select>
            <textarea required placeholder="Tell us about your project *" rows={4} className="w-full px-4 py-3 rounded-2xl border border-black bg-white text-[13px] outline-none" />
            <button type="submit" className="w-full md:w-auto px-8 py-3 rounded-full bg-black text-white font-bold text-[12px] tracking-[0.12em] hover:bg-[#0B0C12] transition-colors">
              {sent ? "SENT ✓" : "SEND PROJECT →"}
            </button>
            {sent && <p className="text-[11px] tracking-[0.12em] font-bold">GRACIAS — TE RESPONDEMOS EN 24H</p>}
          </form>

          <div className="space-y-6 text-[13px]">
            <div>
              <p className="text-[11px] tracking-[0.15em] font-bold">DIRECT</p>
              <p className="mt-1 font-mono">hello@heavy.studio</p>
              <p className="font-mono">+54 11 1234 5678</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.15em] font-bold">STUDIOS</p>
              <p className="mt-1">Buenos Aires — Palermo</p>
              <p>Berlin — Kreuzberg</p>
              <p>Tokyo — Shibuya</p>
            </div>
            <div className="p-4 rounded-2xl bg-black text-white">
              <p className="text-[11px] tracking-[0.15em] font-bold text-[#F5ED32]">WE REPLY FAST</p>
              <p className="mt-1 text-[12px] opacity-70">Promedio 6 horas. No usamos templates de respuesta.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
