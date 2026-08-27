export const metadata = { title: "Services — HEAVY STUDIO" };

const services = [
  { n: "01", title: "Creative Direction", desc: "De la idea madre al sistema visual completo. Dirección que no pide permiso." },
  { n: "02", title: "2D / 3D Animation", desc: "Frame by frame, CGI, procedural. Lo que la historia pida." },
  { n: "03", title: "CGI & World Building", desc: "Mundos que no existen pero se sienten reales." },
  { n: "04", title: "Motion Graphics", desc: "Tipografía que baila, datos que emocionan." },
  { n: "05", title: "Brand Films", desc: "Películas de marca que la gente quiere revisitar." },
  { n: "06", title: "Interactive", desc: "WebGL, experiencias inmersivas, instalaciones." },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#0B0C12] text-[#F5F2EA] pt-20 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10">
        <h1 className="text-[clamp(36px,8vw,100px)] font-black leading-[0.85] tracking-[-0.04em]">
          WHAT
          <br />
          WE <span className="text-[#F5ED32]">DO</span>
        </h1>
        <div className="mt-10 grid md:grid-cols-2 gap-3">
          {services.map((s) => (
            <div key={s.n} className="border border-white/10 rounded-2xl p-6 hover:bg-white hover:text-black transition-colors group">
              <div className="flex justify-between items-start">
                <span className="text-[11px] tracking-[0.2em] font-mono opacity-50">{s.n}</span>
                <span className="w-7 h-7 rounded-full bg-white text-black group-hover:bg-black group-hover:text-white grid place-items-center text-[12px]">↗</span>
              </div>
              <h3 className="text-[22px] font-black mt-4">{s.title}</h3>
              <p className="text-[13px] opacity-60 mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
