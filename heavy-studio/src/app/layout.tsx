import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", weight: ["400","500","700"] });
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-instrument", weight: ["400"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","700"] });

export const metadata: Metadata = {
  title: "HEAVY STUDIO — We Make Loud Stories",
  description: "Estudio creativo de animación, CGI y motion. Hacemos historias que se sienten como películas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${space.variable} ${instrument.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0B0C12] text-[#F5F2EA]">
        <Loader />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
