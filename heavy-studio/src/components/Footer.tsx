import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0C12] text-[#F5F2EA] border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-8 text-[11px] tracking-[0.12em] font-semibold">
          <div>
            <div className="flex items-center gap-2 text-[22px] font-black tracking-[-0.03em] mb-3">
              <span className="w-8 h-8 rounded-full bg-[#F5ED32] grid place-items-center text-black text-[12px]">◼</span> HEAVY
            </div>
            <p className="text-white/60 font-normal tracking-normal normal-case text-[13px] leading-relaxed max-w-sm">
              Estudio creativo de animación, CGI y dirección de arte. Hacemos historias que se sienten como películas.
            </p>
          </div>
          <div className="space-y-2">
            <p className="opacity-40">STUDIO</p>
            <div className="flex flex-col gap-1 font-normal tracking-normal normal-case text-[13px]">
              <Link href="/about" className="hover:text-[#F5ED32]">About</Link>
              <Link href="/work" className="hover:text-[#F5ED32]">Work</Link>
              <Link href="/services" className="hover:text-[#F5ED32]">Services</Link>
              <Link href="/contact" className="hover:text-[#F5ED32]">Contact</Link>
              <Link href="/jobs" className="hover:text-[#F5ED32]">Jobs</Link>
            </div>
          </div>
          <div className="space-y-2">
            <p className="opacity-40">CONNECT</p>
            <div className="flex flex-col gap-1 font-normal tracking-normal normal-case text-[13px]">
              <a href="#" className="hover:text-[#F5ED32]">Instagram</a>
              <a href="#" className="hover:text-[#F5ED32]">Behance</a>
              <a href="#" className="hover:text-[#F5ED32]">LinkedIn</a>
              <a href="#" className="hover:text-[#F5ED32]">Vimeo</a>
              <a href="mailto:hello@heavy.studio" className="hover:text-[#F5ED32]">hello@heavy.studio</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 text-[10px] tracking-[0.15em] font-mono opacity-40">
          <span>© 2026 HEAVY STUDIO • ALL RIGHTS LOUDLY RESERVED</span>
          <span>WE TURN IDEAS INTO MOTION — BUENOS AIRES • BERLIN • TOKYO</span>
        </div>
      </div>
    </footer>
  );
}
