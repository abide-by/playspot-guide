import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";

const sections = [
  { id: "faq", label: "FAQ" },
  { id: "design", label: "공간 설계" },
  { id: "lineup", label: "라인업" },
  { id: "infra", label: "카드 가맹" },
  { id: "network", label: "네트워크" },
  { id: "operation", label: "운영 설치" },
  { id: "contact", label: "담당 센터" },
] as const;

export default function FloatingSectionNav() {
  const [activeId, setActiveId] = useState<string>("faq");
  const [isAtTop, setIsAtTop] = useState(true);
  const sectionElsRef = useRef<Array<{ id: string; el: HTMLElement }>>([]);

  useEffect(() => {
    const collectSections = () => {
      sectionElsRef.current = sections
        .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
        .filter((s): s is { id: string; el: HTMLElement } => Boolean(s.el));
    };

    collectSections();
    window.addEventListener("resize", collectSections);
    return () => window.removeEventListener("resize", collectSections);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const measureActive = () => {
      rafId = 0;
      const sectionEls = sectionElsRef.current;
      if (!sectionEls.length) return;
      setIsAtTop(window.scrollY < 120);
      const viewportMid = window.innerHeight * 0.42;
      let current = sectionEls[0].id;

      for (const s of sectionEls) {
        const rect = s.el.getBoundingClientRect();
        if (rect.top <= viewportMid) current = s.id;
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(measureActive);
    };

    measureActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2">
      <motion.button
        type="button"
        aria-label="HOME"
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "group relative flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-2xl transition-all",
          "bg-white/24 shadow-[0_14px_36px_rgba(15,23,42,0.2)]",
          isAtTop && "bg-[rgba(224,13,83,0.18)] pink-glow shadow-[0_16px_40px_rgba(224,13,83,0.22)]",
        )}
      >
        <House className="h-5 w-5" style={{ color: isAtTop ? "#4A1731" : "#777777" }} strokeWidth={2} />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md border border-white/35 bg-black/35 px-2.5 py-1 text-xs text-white/90 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100">
          HOME
        </span>
      </motion.button>

      {sections.map((section, idx) => {
        const active = !isAtTop && activeId === section.id;
        return (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "group relative flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-2xl transition-all",
              "bg-white/24 shadow-[0_14px_36px_rgba(15,23,42,0.2)]",
              active && "bg-[rgba(224,13,83,0.18)] pink-glow shadow-[0_16px_40px_rgba(224,13,83,0.22)]",
            )}
          >
            {/* SectionHeader 큰 번호와 동일: Inter + font-bold + text-gradient (tabular-nums 제거로 숫자 글리프 일치) */}
            <span
              className={cn(
                "text-lg font-bold tracking-tight",
                active ? "text-gradient" : "text-gradient opacity-40",
              )}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md border border-white/35 bg-black/35 px-2.5 py-1 text-xs text-white/90 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100">
              {section.label}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

