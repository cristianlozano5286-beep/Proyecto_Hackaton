export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  color: string;
  bg: string;
  accent: string;
  description: string;
  challenge: string;
  cover: string;
  images: string[];
  video: string;
  credits: { role: string; name: string }[];
  awards?: string[];
};

export const projects: Project[] = [
  {
    slug: "neon-world",
    title: "NEON\nWORLD",
    client: "NEON LABS",
    category: "CGI • Motion Campaign",
    year: "2026",
    color: "#F5ED32",
    bg: "#0B0C12",
    accent: "#F5ED32",
    description: "Un universo neón donde la arquitectura respira y las calles son circuitos vivos. Creamos una campaña 360º que mezcla CGI hiperrealista con tipografía cinética para una marca de tecnología que quería gritar futuro.",
    challenge: "Construir una ciudad procedural que se siente infinitamente viva, sin perder el toque humano y artesanal.",
    cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534972195531-b367a407d8d6?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=1200&q=80&auto=format&fit=crop",
    ],
    video: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    credits: [
      { role: "Creative Direction", name: "Heavy Studio" },
      { role: "CGI / 3D", name: "M. Volta & K. Sato" },
      { role: "Sound", name: "Amelie Noir" },
    ],
    awards: ["Awwwards SOTD", "FWA of the Day"],
  },
  {
    slug: "future-athletes",
    title: "FUTURE\nATHLETES",
    client: "VECTOR SPORT",
    category: "3D Animation • Brand Film",
    year: "2025",
    color: "#4C7DFF",
    bg: "#F5ED32",
    accent: "#0B0C12",
    description: "Atletas escultóricos congelados en el aire, músculos como arquitectura, sudor como cristal. Una exploración del cuerpo humano aumentado por el diseño especulativo.",
    challenge: "Simulación de telas y pieles a 240fps con rigs musculares procedurales.",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format&fit=crop",
    ],
    video: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    credits: [
      { role: "Art Direction", name: "Heavy Studio" },
      { role: "Motion", name: "J. Petrova" },
      { role: "Grading", name: "CineLight" },
    ],
  },
  {
    slug: "digital-dreams",
    title: "DIGITAL\nDREAMS",
    client: "MINDSCAPE",
    category: "Illustration • CGI",
    year: "2026",
    color: "#F28CCB",
    bg: "#4C7DFF",
    accent: "#F5F2EA",
    description: "Sueños que se derraman fuera de la pantalla. Objetos blandos, texturas orgánicas y paletas que no existen en la naturaleza, para una plataforma de bienestar digital.",
    challenge: "Crear materiales que se sienten comestibles y oníricos a la vez.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80&auto=format&fit=crop",
    ],
    video: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    credits: [
      { role: "Illustration", name: "L. Bianchi" },
      { role: "3D", name: "Heavy Studio" },
      { role: "Music", name: "Poolside FM" },
    ],
  },
  {
    slug: "human-energy",
    title: "HUMAN\nENERGY",
    client: "ORBITAL",
    category: "Motion Graphics • Explainer",
    year: "2025",
    color: "#8DFF68",
    bg: "#FF7347",
    accent: "#0B0C12",
    description: "Visualizamos la energía humana como fluido luminoso que conecta ciudades, cuerpos y máquinas. Infografías que se sienten como cine.",
    challenge: "Traducir datos complejos en coreografías fluidas sin perder rigor.",
    cover: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534972195531-b367a407d8d6?w=1200&q=80&auto=format&fit=crop",
    ],
    video: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    credits: [
      { role: "Direction", name: "Heavy Studio" },
      { role: "Data Viz", name: "R. Kim" },
      { role: "VO", name: "S. Okafor" },
    ],
  },
  {
    slug: "wild-motion",
    title: "WILD\nMOTION",
    client: "TERRA",
    category: "2D Animation • CGI",
    year: "2026",
    color: "#FF7347",
    bg: "#8DFF68",
    accent: "#0B0C12",
    description: "Bestias hechas de tipografía, selvas que laten al ritmo del bass, flores que explotan en 24fps. Naturaleza desatada y estilizada.",
    challenge: "Mezclar frame-by-frame artesanal con simulaciones de partículas.",
    cover: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1500322969630-a47108e009eb?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80&auto=format&fit=crop",
    ],
    video: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    credits: [
      { role: "Animation", name: "Heavy Studio" },
      { role: "Character", name: "Y. Tanaka" },
      { role: "Sound Design", name: "Wild Audio" },
    ],
  },
  {
    slug: "after-midnight",
    title: "AFTER\nMIDNIGHT",
    client: "NOCTURNE",
    category: "Brand Film • CGI",
    year: "2024",
    color: "#F5F2EA",
    bg: "#0B0C12",
    accent: "#F28CCB",
    description: "La ciudad después de medianoche, cuando los neones se convierten en constelaciones y cada ventana es una película. Un poema visual nocturno.",
    challenge: "Iluminación cinematográfica con HDRI custom y neblina volumétrica.",
    cover: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1200&q=80&auto=format&fit=crop",
    ],
    video: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    credits: [
      { role: "Direction", name: "Heavy Studio" },
      { role: "DOP", name: "A. Müller" },
      { role: "Color", name: "Nocturne Grade" },
    ],
  },
];
