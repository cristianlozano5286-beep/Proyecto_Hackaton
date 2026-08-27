import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export const metadata = { title: "Work — HEAVY STUDIO" };

export default function WorkPage() {
  return (
    <div className="bg-[#F5F2EA] text-black min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10">
        <div className="flex justify-between items-end border-b border-black/10 pb-6">
          <h1 className="text-[clamp(40px,9vw,120px)] font-black leading-[0.85] tracking-[-0.04em]">
            WORK <span className="font-serif italic font-normal">(06)</span>
          </h1>
          <p className="hidden md:block text-[11px] tracking-[0.14em] font-mono opacity-60 max-w-[260px] text-right">
            Cada proyecto es una pieza de arte editorial. No hacemos templates.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-12 gap-4">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={`group relative overflow-hidden bg-black ${i % 3 === 0 ? "md:col-span-7" : i % 3 === 1 ? "md:col-span-5" : "md:col-span-6"}`}
            >
              <div className={`${i % 2 === 0 ? "aspect-[4/3]" : "aspect-[16/10]"} overflow-hidden`}>
                <Image src={p.cover} alt={p.title} width={900} height={600} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="text-[10px] tracking-[0.14em] font-mono opacity-70">{p.client} • {p.category} • {p.year}</p>
                <h3 className="text-[22px] font-black whitespace-pre leading-[0.9]">{p.title}</h3>
              </div>
              <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-black grid place-items-center text-[11px]">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
