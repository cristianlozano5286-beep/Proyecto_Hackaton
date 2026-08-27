"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const v = el.closest("[data-cursor]")?.getAttribute("data-cursor");
      setHover(v || null);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white pointer-events-none z-[60] mix-blend-difference hidden md:grid place-items-center text-[9px] font-bold tracking-[0.1em] text-white"
      animate={{
        x: pos.x - 12,
        y: pos.y - 12,
        scale: hover ? 3.2 : 1,
        backgroundColor: hover ? "#fff" : "transparent",
        color: hover ? "#000" : "#fff",
      }}
      transition={{ type: "spring", damping: 18, stiffness: 260, mass: 0.3 }}
    >
      <span className="opacity-0 group-hover:opacity-100" style={{ opacity: hover ? 1 : 0, fontSize: hover ? 7 : 0 }}>
        {hover || ""}
      </span>
    </motion.div>
  );
}
