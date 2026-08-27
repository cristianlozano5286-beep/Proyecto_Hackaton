export const metadata = { title: "Jobs — HEAVY STUDIO" };
export default function JobsPage() {
  return (
    <div className="bg-[#F5F2EA] text-black pt-20 min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-10">
        <h1 className="text-[clamp(36px,8vw,90px)] font-black leading-[0.85] tracking-[-0.04em]">
          JOIN THE <span className="bg-[#F5ED32] px-2">NOISE</span>
        </h1>
        <p className="mt-4 max-w-[560px] opacity-70 text-[13px] leading-relaxed">
          Buscamos gente que hace cosas con las manos, no solo con el mouse. Si tu portfolio hace ruido, queremos escucharlo.
        </p>
        <div className="mt-8 space-y-3">
          {[
            { role: "Senior 3D Artist (Cinema 4D / Houdini)", loc: "Remote / Berlin" },
            { role: "Motion Designer (2D / Frame by frame)", loc: "Buenos Aires" },
            { role: "Producer — Brand Films", loc: "Remote" },
          ].map((j) => (
            <div key={j.role} className="flex justify-between items-center p-5 rounded-2xl border border-black/10 bg-white">
              <div>
                <p className="font-bold text-[14px]">{j.role}</p>
                <p className="text-[11px] tracking-[0.12em] font-mono opacity-60">{j.loc}</p>
              </div>
              <a href="mailto:jobs@heavy.studio" className="px-4 py-2 rounded-full bg-black text-white text-[11px] font-bold">
                APPLY →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
