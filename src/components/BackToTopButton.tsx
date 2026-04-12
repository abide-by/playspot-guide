import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

type BackToTopButtonProps = {
  showAfterPx?: number;
};

export default function BackToTopButton({ showAfterPx = 520 }: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY >= showAfterPx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="맨 위로 이동"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClick}
          className="fixed z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-foreground backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] max-md:bottom-[max(5.5rem,calc(env(safe-area-inset-bottom,0px)+1.25rem))]"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

