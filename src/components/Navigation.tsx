import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MACHINE_INTRO_URL = "https://playspot-intropage.pages.dev/";

const navItems = [
  { href: "#faq", label: "01 — FAQ" },
  { href: "#design", label: "02 — 맞춤 공간 설계" },
  { href: "#lineup", label: "03 — 라인업 비교" },
  { href: "#infra", label: "04 — 카드 가맹" },
  { href: "#network", label: "05 — 네트워크·전력" },
  { href: "#operation", label: "06 — 운영·설치" },
  { href: "#contact", label: "07 — 담당 센터" },
] as const;

const machineIntroInk = "text-[#FF1C5C] hover:text-[#d91850]";

/** 헤더(md+): 텍스트만 + 호버 살짝 확대 — 모바일은 햄버거 메뉴에만 노출 */
const machineIntroHeaderText =
  `inline-block origin-center text-sm font-medium no-underline transition-[transform,color] duration-200 ease-out hover:scale-105 ${machineIntroInk} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(210_28%_97%)]`;

const Navigation = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenuAndHome = () => {
    setIsOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 relative flex items-center justify-center">
          <div className="hidden md:block md:absolute md:right-6 md:top-1/2 md:z-[1] md:-translate-y-1/2">
            <a
              href={MACHINE_INTRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={machineIntroHeaderText}
            >
              3세대 머신 소개
            </a>
          </div>

          <a
            href="/"
            className="mx-auto flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            aria-label="PLAY SPOT"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/playspot_logo.png"
              alt="PLAY SPOT"
              className="h-[22px] w-auto object-contain object-left md:h-[26px]"
              width={132}
              height={26}
              decoding="async"
            />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden absolute right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-foreground backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:bg-white/15"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-14 z-40 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
          >
            <button
              type="button"
              aria-label="메뉴 닫기"
              className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              id="mobile-nav-drawer"
              initial={{ x: 24, opacity: 0.98 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 24, opacity: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-0 h-full w-[min(50vw,18rem)] min-w-[14rem] max-w-[20rem] border-l border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-full overflow-y-auto px-6 py-6">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-white/6 to-transparent" />
                <div className="relative flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-wide text-white/80">MENU</span>
                </div>

                <div className="relative mt-6 flex flex-col gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ delay: 0 }}
                  >
                    <Link
                      to="/"
                      onClick={closeMenuAndHome}
                      className="block rounded-lg px-3 py-2 text-base font-semibold tracking-tight text-white hover:bg-white/12"
                    >
                      홈
                    </Link>
                  </motion.div>
                  <motion.a
                    href={MACHINE_INTRO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ delay: 0.04 }}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-semibold tracking-tight text-white/90 no-underline transition-colors hover:text-white hover:bg-white/12"
                  >
                    3세대 머신 소개
                  </motion.a>
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ delay: (i + 2) * 0.04 }}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 text-base font-semibold tracking-tight text-white/90 hover:text-white hover:bg-white/12"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ delay: (navItems.length + 2) * 0.04 }}
                    onClick={() => setIsOpen(false)}
                    className="mt-3 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/12 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] hover:bg-white/16"
                  >
                    담당 센터 바로가기
                  </motion.a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
