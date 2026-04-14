import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader, FadeInUp } from "./AnimatedSection";
import { ArrowLeft, ArrowRight, Cpu, Wrench } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import auto1 from "@/assets/lineup-gallery/auto-1.png";
import auto2 from "@/assets/lineup-gallery/auto-2.png";
import auto3 from "@/assets/lineup-gallery/auto-3.png";
import manual1 from "@/assets/lineup-gallery/manual-1.png";
import manual2 from "@/assets/lineup-gallery/manual-2.png";
import manual3 from "@/assets/lineup-gallery/manual-3.png";

type GalleryKind = "auto" | "manual";

const AUTO_GALLERY = [
  { src: auto1, alt: "플레이 큐브 자동 머신 현장 사진 1" },
  { src: auto2, alt: "플레이 큐브 자동 머신 현장 사진 2" },
  { src: auto3, alt: "플레이 큐브 자동 머신 현장 사진 3" },
] as const;

const MANUAL_GALLERY = [
  { src: manual1, alt: "플레이 수동 머신 현장 사진 1" },
  { src: manual2, alt: "플레이 수동 머신 현장 사진 2" },
  { src: manual3, alt: "플레이 수동 머신 현장 사진 3" },
] as const;

function preloadImageUrls(urls: string[]) {
  for (const src of urls) {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  }
}

const specs = [
  { label: "제품 크기", auto: "330×472×550 mm", manual: "320×435×1770 mm (3단기준)" },
  { label: "무게", auto: "약 19kg", manual: "약 21kg" },
  { label: "가격", auto: "900,000원 (VAT 별도)", manual: "2단 300,000원 / 3단 455,000원 (VAT 별도)" },
  { label: "1PY당 예상 투자", auto: "약 800~900만원", manual: "약 400만원" },
  { label: "캡슐 규격", auto: "45mm ~ 최대 92mm", manual: "45mm ~ 최대 75mm" },
  { label: "결제 방식", auto: "카드, 카카오페이, 토스페이, 네이버페이", manual: "전용 코인 (개당 1,000원 교환)" },
  { label: "원격 제어", auto: "가능 (결제 취소, 토출 등)", manual: "불가 (현장 방문 필요)" },
  { label: "전원", auto: "상시 220V 콘센트 + Wi-Fi 필수", manual: "무전원 가능 (교환기 사용 시 콘센트 필요)" },
];

const autoHighlights = [
  "카드·간편결제 등 **디지털 결제**와 **원격 관리**에 최적화되어 무인·원거리 운영에 유리합니다.",
  "캡슐 규격 **최대 92mm**까지 넓게 대응해 상품 구성의 폭이 넓습니다.",
  "결제·매출 흐름을 **앱에서 확인**하며 운영 데이터를 한곳에서 다루기 쉽습니다.",
];

const manualHighlights = [
  "**초기 도입 비용**이 상대적으로 낮아 부담 없이 시작하기 좋습니다.",
  "구성에 따라 **전원·Wi-Fi 없이**도 운영할 수 있어 설치 환경이 단순해질 수 있습니다.",
  "**기계식 구조**로 현장에서 바로 상태를 확인하고 대응하기 직관적입니다.",
];

const parseBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const ALL_GALLERY_URLS = [
  ...AUTO_GALLERY.map((s) => s.src),
  ...MANUAL_GALLERY.map((s) => s.src),
];

const LineupSection = () => {
  const [gallery, setGallery] = useState<GalleryKind | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideImageLoaded, setSlideImageLoaded] = useState(false);
  const slideImgRef = useRef<HTMLImageElement>(null);
  const prevNavRef = useRef<HTMLButtonElement>(null);
  const nextNavRef = useRef<HTMLButtonElement>(null);
  const [activeNavControl, setActiveNavControl] = useState<"prev" | "next" | null>(null);

  const slides = useMemo(() => {
    if (gallery === "auto") return [...AUTO_GALLERY];
    if (gallery === "manual") return [...MANUAL_GALLERY];
    return [];
  }, [gallery]);

  useEffect(() => {
    if (gallery === null) return;
    setSlideIdx(0);
  }, [gallery]);

  /** 배포 환경에서 팝업 첫 페인트 전 깜빡임 완화: 유휴 시 6장 선로딩 + 카드 호버 시 해당 세트 우선 */
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) preloadImageUrls(ALL_GALLERY_URLS);
    };
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 2800 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const t = window.setTimeout(run, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  const preloadAutoGallery = useCallback(() => {
    preloadImageUrls(AUTO_GALLERY.map((s) => s.src));
  }, []);

  const preloadManualGallery = useCallback(() => {
    preloadImageUrls(MANUAL_GALLERY.map((s) => s.src));
  }, []);

  const currentSlideSrc = slides[slideIdx]?.src;
  useLayoutEffect(() => {
    if (!currentSlideSrc) return;
    setSlideImageLoaded(false);
    const el = slideImgRef.current;
    if (el?.complete && el.naturalWidth > 0) setSlideImageLoaded(true);
  }, [currentSlideSrc]);

  useEffect(() => {
    if (gallery === null) setActiveNavControl(null);
  }, [gallery]);

  useEffect(() => {
    if (gallery === null || slides.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveNavControl("prev");
        setSlideIdx((i) => (i - 1 + slides.length) % slides.length);
        queueMicrotask(() =>
          prevNavRef.current?.focus({ preventScroll: true }),
        );
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveNavControl("next");
        setSlideIdx((i) => (i + 1) % slides.length);
        queueMicrotask(() =>
          nextNavRef.current?.focus({ preventScroll: true }),
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gallery, slides.length]);

  const navArrowRing =
    "ring-2 ring-primary ring-offset-2 ring-offset-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]";

  const dialogTitle = gallery === "auto" ? "플레이 큐브 (자동)" : gallery === "manual" ? "플레이 수동 머신" : "";
  const current = slides[slideIdx];

  useEffect(() => {
    if (gallery === null || slides.length === 0) return;
    const next = (slideIdx + 1) % slides.length;
    const prev = (slideIdx - 1 + slides.length) % slides.length;
    preloadImageUrls([slides[next]!.src, slides[prev]!.src]);
  }, [gallery, slideIdx, slides]);

  return (
  <section id="lineup" className="py-32 px-6">
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        num="03"
        tag="Step 3 — 라인업 비교"
        title="플레이 큐브 vs 플레이 수동 머신"
        subtitle="자동·수동은 우열이 아니라 운영 환경과 목적에 맞는 선택입니다. 제원과 강점을 나란히 확인해 보세요."
      />

      {/* 성격이 드러나는 두 컬럼 — 동등한 시각 무게 */}
      <FadeInUp>
        <div className="grid grid-cols-1 items-stretch gap-6 mb-10 md:grid-cols-2">
          <motion.button
            type="button"
            initial={false}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: "tween", duration: 0.09, ease: "easeOut" }}
            className="glass-card flex h-full min-h-0 w-full flex-col p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(210_28%_97%)] md:p-7"
            onPointerEnter={preloadAutoGallery}
            onFocus={preloadAutoGallery}
            onClick={() => {
              setSlideIdx(0);
              setGallery("auto");
            }}
          >
            <div className="flex items-start gap-3 mb-5">
              <div className="glass-icon-box h-11 w-11 shrink-0">
                <Cpu size={20} className="text-primary" strokeWidth={2} />
              </div>
              <div className="min-w-0 text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold mb-2">
                  자동
                </span>
                <h3 className="text-xl font-bold text-foreground leading-snug">플레이 큐브</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">디지털·무인 운영에 강한 타입</p>
                <p className="text-xs text-primary/75 mt-2 font-medium">클릭하면 현장 사진 3장을 볼 수 있어요</p>
              </div>
            </div>
            <ul className="min-h-0 flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {autoHighlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-primary font-bold shrink-0">·</span>
                  <span>{parseBold(line)}</span>
                </li>
              ))}
            </ul>
          </motion.button>

          <motion.button
            type="button"
            initial={false}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: "tween", duration: 0.09, ease: "easeOut" }}
            className="glass-card flex h-full min-h-0 w-full flex-col p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(210_28%_97%)] md:p-7"
            onPointerEnter={preloadManualGallery}
            onFocus={preloadManualGallery}
            onClick={() => {
              setSlideIdx(0);
              setGallery("manual");
            }}
          >
            <div className="flex items-start gap-3 mb-5">
              <div className="glass-icon-box-sky h-11 w-11 shrink-0">
                <Wrench size={20} className="text-sky-800" strokeWidth={2} />
              </div>
              <div className="min-w-0 text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-900/10 text-sky-900 text-xs font-bold mb-2">
                  수동
                </span>
                <h3 className="text-xl font-bold text-foreground leading-snug">플레이 수동 머신</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">도입 부담과 현장 운영에 강한 타입</p>
                <p className="text-xs text-sky-800/80 mt-2 font-medium">클릭하면 현장 사진 3장을 볼 수 있어요</p>
              </div>
            </div>
            <ul className="min-h-0 flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {manualHighlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-sky-800 font-bold shrink-0">·</span>
                  <span>{parseBold(line)}</span>
                </li>
              ))}
            </ul>
          </motion.button>
        </div>
      </FadeInUp>

      {/* 단일 비교표 — 동등한 두 열 */}
      <FadeInUp delay={0.05}>
        <div className="glass-card overflow-hidden mb-10">
          <div className="px-5 py-4 border-b border-white/40 bg-white/25 text-center">
            <p className="text-sm font-semibold text-foreground">제원·조건 한눈에 비교</p>
            <p className="text-xs text-muted-foreground mt-0.5">같은 항목 기준으로 자동 / 수동 값을 확인하세요</p>
          </div>
          <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
            <div className="min-w-full md:min-w-[34rem] text-sm divide-y divide-white/20">
              <div className="grid grid-cols-[minmax(5.25rem,26%)_minmax(0,1fr)_minmax(0,1fr)]">
                <div className="min-w-0 bg-white/35 px-2.5 py-3 font-semibold text-foreground text-left pl-3 md:px-3 md:pl-4">
                  항목
                </div>
                <div className="min-w-0 bg-primary/[0.07] px-2.5 py-3 font-semibold text-primary text-left md:text-center md:px-3">
                  플레이 큐브
                </div>
                <div className="min-w-0 bg-sky-950/[0.06] px-2.5 py-3 font-semibold text-sky-900 text-left md:text-center md:px-3">
                  플레이 수동
                </div>
              </div>
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-[minmax(5.25rem,26%)_minmax(0,1fr)_minmax(0,1fr)]"
                >
                  <div className="min-w-0 bg-white/30 px-2.5 py-3.5 text-muted-foreground pl-3 md:px-3 md:pl-4 break-words">
                    {s.label}
                  </div>
                  <div className="min-w-0 bg-primary/[0.04] px-2.5 py-3.5 text-foreground text-left leading-snug break-words md:text-center md:px-3">
                    {s.auto}
                  </div>
                  <div className="min-w-0 bg-sky-950/[0.03] px-2.5 py-3.5 text-foreground text-left leading-snug break-words md:text-center md:px-3">
                    {s.manual}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* A/S · 자동 가이드 · 수동 가이드 — 분리·대칭 */}
      <FadeInUp delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          <div className="glass-card p-6 flex flex-col h-full md:min-h-[11rem]">
            <h4 className="text-base font-bold text-foreground mb-2">A/S</h4>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              설치일 기준 <strong className="text-foreground">신품 1년 / 중고 2개월</strong> 무상 A/S (사용자 과실 및 외부 파손 제외)
            </p>
          </div>
          <div className="glass-card p-6 flex flex-col h-full md:min-h-[11rem]">
            <h4 className="text-base font-bold text-primary mb-2">자동 운영 가이드</h4>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              다양한 간편 결제를 지원하고, 결제·매출 내역이 실시간으로 맞춰져 별도 대조 없이 운영하기 편합니다. 앱 매출은 참고용으로 보시고, 정확한 정산은 카드사·nibs 등에서 확인하시는 것을 권장합니다.
            </p>
          </div>
          <div className="glass-card p-6 flex flex-col h-full md:min-h-[11rem]">
            <h4 className="text-base font-bold text-sky-900 mb-2">수동 운영 가이드</h4>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              원활한 운영을 위해 <strong className="text-foreground">전용 코인</strong> 사용을 권장합니다. 상황에 따라 코인이 혼용될 수 있으니 비치·회수 시 유의해 주세요. 구조가 단순해 현장에서 바로 점검·안내하기 좋습니다.
            </p>
          </div>
        </div>
      </FadeInUp>

      <Dialog
        open={gallery !== null}
        onOpenChange={(open) => {
          if (!open) setGallery(null);
        }}
      >
        <DialogContent
          overlayClassName="bg-gradient-to-b from-black/18 via-black/8 to-black/12 backdrop-blur-[2px]"
          closeClassName="text-white opacity-90 hover:bg-white/15 hover:text-white hover:opacity-100 data-[state=open]:bg-transparent data-[state=open]:text-white"
          className="flex max-w-[min(100vw-1rem,52rem)] flex-col gap-4 overflow-hidden !border-white/25 !bg-white/[0.02] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-2xl"
        >
          <DialogHeader className="space-y-1 pr-8 text-left sm:text-left">
            <DialogTitle className="text-lg font-semibold tracking-tight text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]">
              {dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-sm text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
              좌우 화살표 버튼 또는 키보드 방향키로 사진을 넘겨 보세요.
            </DialogDescription>
          </DialogHeader>
          {slides.length > 0 && current ? (
            <>
              <div
                className="relative mx-auto h-[min(70vh,560px)] min-h-[min(40vh,240px)] w-full shrink-0 overflow-hidden rounded-lg"
                aria-busy={!slideImageLoaded}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-4 bg-white/[0.14] p-6 ring-1 ring-inset ring-white/25 transition-opacity duration-200",
                    slideImageLoaded ? "opacity-0" : "opacity-100",
                  )}
                  aria-hidden
                >
                  <div className="flex w-full max-w-sm flex-col gap-3">
                    <div className="h-[min(28vh,200px)] w-full animate-pulse rounded-md bg-white/20" />
                    <div className="mx-auto h-2.5 w-28 animate-pulse rounded-full bg-white/25" />
                    <div className="mx-auto h-2.5 w-40 animate-pulse rounded-full bg-white/18" />
                  </div>
                  <p className="text-center text-xs font-medium tracking-tight text-white/55">
                    사진을 불러오는 중…
                  </p>
                </div>
                <div className="absolute inset-0 z-[1] flex items-center justify-center p-1">
                  <img
                    ref={slideImgRef}
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fetchPriority="high"
                    decoding="sync"
                    onLoad={() => setSlideImageLoaded(true)}
                    className={cn(
                      "max-h-full max-w-full object-contain transition-opacity duration-200",
                      slideImageLoaded ? "opacity-100" : "opacity-0",
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  ref={prevNavRef}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 shrink-0 rounded-full border-white/35 bg-white/[0.08] text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md hover:bg-white/18 hover:text-white focus-visible:outline-none",
                    activeNavControl === "prev" ? navArrowRing : "focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                  )}
                  onClick={() => {
                    setActiveNavControl("prev");
                    setSlideIdx((i) => (i - 1 + slides.length) % slides.length);
                  }}
                  aria-label="이전 사진"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2" role="tablist" aria-label="사진 선택">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === slideIdx}
                      onFocus={() => setActiveNavControl(null)}
                      onClick={() => setSlideIdx(i)}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                        i === slideIdx ? "bg-white shadow-[0_0_0_2px_hsl(var(--primary))]" : "bg-white/35 hover:bg-white/55",
                      )}
                      aria-label={`${i + 1}번째 사진 보기`}
                    />
                  ))}
                </div>
                <Button
                  ref={nextNavRef}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 shrink-0 rounded-full border-white/35 bg-white/[0.08] text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md hover:bg-white/18 hover:text-white focus-visible:outline-none",
                    activeNavControl === "next" ? navArrowRing : "focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                  )}
                  onClick={() => {
                    setActiveNavControl("next");
                    setSlideIdx((i) => (i + 1) % slides.length);
                  }}
                  aria-label="다음 사진"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  </section>
  );
};

export default LineupSection;
