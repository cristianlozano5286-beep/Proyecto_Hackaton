"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let n = 0;
    const t = setInterval(() => {
      n += Math.floor(Math.random() * 18) + 6;
      if (n >= 100) {
        n = 100;
        clearInterval(t);
        setTimeout(() => setDone(true), 300);
      }
      setCount(n);
    }, 70);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0B0C12] text-[#F5F2EA] flex flex-col justify-between p-6 md:p-10"
        >
          <div className="flex justify-between text-[11px] tracking-[0.2em] font-mono opacity-60">
            <span>HEAVY STUDIO — 2026</span>
            <span>LOADING</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[clamp(60px,18vw,220px)] font-black leading-[0.78] tracking-[-0.05em]">
              <div className="overflow-hidden">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  HEAVY
                </motion.div>
              </div>
              <div className="overflow-hidden text-[#F5ED32]">
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
                  STUDIO
                </motion.div>
              </div>
            </div>
            <div className="mt-6 h-[2px] bg-white/10 relative overflow-hidden max-w-[420px]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#F5ED32]"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-[11px] tracking-[0.2em] font-mono opacity-60">
              WE TURN IDEAS INTO MOTION
            </div>
            <div className="text-[48px] md:text-[72px] font-black tracking-[-0.04em] leading-none tabular-nums">
              {String(count).padStart(2, "0")}
              <span className="text-[18px] align-super">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
