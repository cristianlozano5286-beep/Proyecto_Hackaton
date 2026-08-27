import Image from "next/image";

export const metadata = { title: "About — HEAVY STUDIO" };

export default function AboutPage() {
  return (
    <div className="bg-[#F5F2EA] text-black pt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10">
        <p className="text-[11px] tracking-[0.2em] font-bold">ABOUT — WHO WE ARE</p>
        <h1 className="text-[clamp(40px,9vw,120px)] font-black leading-[0.85] tracking-[-0.04em] mt-2">
          WE ARE <span className="font-serif italic font-normal">12</span> HUMANS
          <br />
          MAKING <span className="bg-[#F5ED32] px-2">NOISE</span>
        </h1>
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 mt-8">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="team" width={700} height={500} className="rounded-2xl object-cover w-full h-[380px]" />
          <div className="space-y-4">
            <p className="text-[18px] leading-relaxed font-light">
              Nacimos en un cuarto de 12m² en Buenos Aires. Hoy somos un estudio distribuido entre BA, Berlin y Tokyo. 12 personas, 0 jerarquías aburridas.
            </p>
            <p className="text-[13px] opacity-70 leading-relaxed">
              Creemos que la animación es el idioma más universal. Nos obsesiona el craft: cada curva, cada frame, cada rebote tiene intención. Trabajamos directo con fundadores y marketing teams que quieren hacer ruido real.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10">
              <div>
                <div className="text-[28px] font-black">50+</div>
                <div className="text-[10px] tracking-[0.14em] font-bold">PROJECTS</div>
              </div>
              <div>
                <div className="text-[28px] font-black">12</div>
                <div className="text-[10px] tracking-[0.14em] font-bold">HUMANS</div>
              </div>
              <div>
                <div className="text-[28px] font-black">8</div>
                <div className="text-[10px] tracking-[0.14em] font-bold">YEARS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
