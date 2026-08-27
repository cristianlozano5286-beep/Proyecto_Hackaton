import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="bg-[#0B0C12] text-[#F5F2EA]">
      {/* Hero */}
      <section className="pt-20 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between text-[10px] tracking-[0.18em] font-mono opacity-50 py-4 border-y border-white/10">
            <span>{project.client}</span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1 className="text-[clamp(48px,12vw,160px)] font-black leading-[0.8] tracking-[-0.04em] whitespace-pre mt-6">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] tracking-[0.12em] font-bold">
            <span className="px-3 py-1 rounded-full bg-white text-black">{project.client}</span>
            <span className="px-3 py-1 rounded-full border border-white/20">{project.category}</span>
            <span className="px-3 py-1 rounded-full border border-white/20">{project.year}</span>
          </div>
        </div>
      </section>

      {/* Cover video/image */}
      <div className="mt-8 w-full aspect-[16/9] bg-black overflow-hidden">
        <Image src={project.cover} alt={project.title} width={1600} height={900} className="w-full h-full object-cover" />
      </div>

      {/* About */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-6 py-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8">
        <div>
          <p className="text-[11px] tracking-[0.18em] font-bold opacity-40">ABOUT THE PROJECT</p>
          <p className="mt-3 text-[18px] leading-relaxed font-light">{project.description}</p>
          <p className="mt-4 text-[13px] opacity-60 leading-relaxed">{project.challenge}</p>
        </div>
        <div className="border border-white/10 rounded-2xl p-5">
          <p className="text-[11px] tracking-[0.15em] font-bold">CREDITS</p>
          <div className="mt-3 space-y-2 text-[13px]">
            {project.credits.map((c) => (
              <div key={c.role} className="flex justify-between">
                <span className="opacity-50">{c.role}</span>
                <span className="font-medium">{c.name}</span>
              </div>
            ))}
          </div>
          {project.awards && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[11px] tracking-[0.15em] font-bold">AWARDS</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.awards.map((a) => (
                  <span key={a} className="px-3 py-1 rounded-full bg-[#F5ED32] text-black text-[11px] font-bold">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 space-y-4 pb-12">
        {project.images.map((img, i) => (
          <div key={i} className={`overflow-hidden rounded-2xl ${i === 1 ? "md:ml-[20%]" : i === 2 ? "md:mr-[20%]" : ""}`}>
            <Image src={img} alt="" width={1400} height={900} className="w-full h-auto object-cover" />
          </div>
        ))}
        <div className="rounded-2xl overflow-hidden bg-black aspect-video grid place-items-center text-white/60">
          <span className="text-[11px] tracking-[0.2em] font-mono">VIDEO — {project.title.replace("\n", " ")} (placeholder)</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 opacity-60 text-[11px] leading-relaxed">
          <p>Behind the scenes: bocetos, previz y tests de lookdev. Cada frame pasó por 3 rondas de dirección de arte.</p>
          <p>Entregables: master 4K, vertical 9:16, cutdowns 15s/06s, stills CGI, toolkit tipográfico.</p>
        </div>
      </section>

      {/* Next */}
      <Link href={`/work/${next.slug}`} className="block border-t border-white/10 py-8 px-4 md:px-6 hover:bg-white hover:text-black transition-colors group">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <p className="text-[11px] tracking-[0.2em] font-mono opacity-50">NEXT PROJECT →</p>
            <p className="text-[28px] font-black whitespace-pre leading-none">{next.title}</p>
          </div>
          <span className="w-10 h-10 rounded-full border border-current grid place-items-center group-hover:bg-black group-hover:text-white">→</span>
        </div>
      </Link>
    </div>
  );
}
