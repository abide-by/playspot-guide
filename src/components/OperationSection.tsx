import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import { SectionHeader, SubLabel, FadeInUp } from "./AnimatedSection";
import { Lightbulb, Package, Truck, Image } from "lucide-react";

const steps = [
  { num: "1", title: "카드사 가맹 신청·심사", desc: "제출 서류 기반 카드사 가맹 심사 진행" },
  { num: "2", title: "머신 세팅", desc: "가맹 완료 후 단말기 시스템 및 운영 S/W 세팅" },
  { num: "3", title: "출고 일정 확정", desc: "세팅 완료 제품 출고 일정 최종 확인" },
  { num: "4", title: "사전 연락", desc: "설치 전날 담당 부서에서 방문 시간 사전 연락" },
  { num: "5", title: "현장 설치·교육", desc: "3D 시안 기반 현장 설치 + 점주 운영 교육" },
];

const productCards = [
  {
    icon: Package,
    title: "화물 & 택배 발송",
    body: "지정 장소로 상품을 화물 & 택배로 사전 발송.",
  },
  {
    icon: Truck,
    title: "설치 시 수령",
    body: "담당자 방문 시 상품 함께 전달. (플레이 큐브 구매 시에만 해당)",
    tip: "머신 50대 구매 시: 추가 차량 배차보다 저렴한 화물/택배 배송으로 물류비 절감이 가능합니다.",
  },
  {
    icon: Image,
    title: "포스터 지원",
    body: "신규 설치 시 머신 1대당 포스터 1개 무료 제공. 추가 제작 시 개당 2,000원. 이미지 파일은 설치 최소 4일 전 제출.",
  },
];

const OperationSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement | null>(null);
  const lastDotRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const [activeCount, setActiveCount] = useState(0);
  const [lineMetrics, setLineMetrics] = useState<{ top: number; height: number; left: number }>({ top: 0, height: 0, left: 12 });

  useEffect(() => {
    const update = () => {
      const container = timelineRef.current;
      const first = firstDotRef.current;
      const last = lastDotRef.current;
      if (!container || !first || !last) return;

      const cRect = container.getBoundingClientRect();
      const fRect = first.getBoundingClientRect();
      const lRect = last.getBoundingClientRect();

      // Visual nudge: borders/blur can make the center feel slightly low.
      const NUDGE_TOP_PX = -2;
      const NUDGE_BOTTOM_PX = -4; // slightly more to avoid overshooting the last dot (mobile)
      const LINE_W_PX = 2; // Tailwind w-0.5
      const centerX = fRect.left - cRect.left + fRect.width / 2;
      const left = centerX - LINE_W_PX / 2;

      const top = fRect.top - cRect.top + fRect.height / 2 + NUDGE_TOP_PX;
      const bottom = lRect.top - cRect.top + lRect.height / 2 + NUDGE_BOTTOM_PX;
      const height = Math.max(0, bottom - top);

      setLineMetrics({ top, height, left });
    };

    update();
    window.addEventListener("resize", update);

    // Font/image loads can shift layout; re-measure once more.
    const t = window.setTimeout(update, 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", update);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", () => {
    const el = timelineRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elTop = rect.top;
    const elCenter = rect.top + rect.height / 2;

    // 0 when viewport center hits the top of the timeline,
    // 1 when the timeline center aligns with the viewport center.
    const denom = Math.max(1, elCenter - elTop); // == rect.height / 2
    const raw = (viewportCenter - elTop) / denom;
    const v = Math.min(1, Math.max(0, raw));

    progress.set(v);
  });

  useMotionValueEvent(progress, "change", (v) => {
    const n = steps.length;
    const next = Math.min(n, Math.max(0, Math.round(v * n)));
    setActiveCount(next);
  });

  const active = useMemo(() => steps.map((_, i) => i < activeCount), [activeCount]);

  return (
    <section id="operation" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          num="06"
          tag="Step 6 — 운영 및 설치"
          title="설치 프로세스 & 상품 준비"
          subtitle="서류 접수부터 현장 설치·교육까지의 전체 진행 단계"
        />

        <SubLabel>— 설치 진행 단계</SubLabel>
        <div ref={timelineRef} className="relative isolate mb-16 pl-8">
          {/* Progress line — scaleY()가 쌓임 맥락을 만들어 숫자 점보다 위로 올라오는 경우가 있어 z-index로 고정 */}
          <div
            className="pointer-events-none absolute z-0 w-0.5 bg-border/30"
            style={{ top: lineMetrics.top, height: lineMetrics.height, left: lineMetrics.left }}
          />
          <motion.div
            className="pointer-events-none absolute top-0 z-[1] w-0.5 origin-top bg-primary"
            style={{ top: lineMetrics.top, height: lineMetrics.height, left: lineMetrics.left, scaleY: progress }}
          />

          <div className="relative z-[2] space-y-8">
            {steps.map((step, i) => (
              <FadeInUp key={step.num} delay={i * 0.08}>
                <div className="relative">
                  <div
                    ref={i === 0 ? firstDotRef : i === steps.length - 1 ? lastDotRef : undefined}
                    className={`glass-icon-box absolute -left-8 top-1 !h-7 !w-7 !rounded-full transition-all duration-300 ${
                      active[i] ? "!border-primary/45 pink-glow" : "!border-white/35"
                    }`}
                  >
                    <span className={`text-xs font-bold tabular-nums ${active[i] ? "text-primary" : "text-muted-foreground"}`}>
                      {step.num}
                    </span>
                  </div>
                  <div className={`glass-card p-5 ml-2 transition-all duration-300 ${active[i] ? "border-primary/30" : ""}`}>
                    <h4 className="text-base font-semibold text-foreground leading-snug">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>

        <SubLabel>— 가챠 상품 및 포스터 준비</SubLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {productCards.map((card, i) => (
            <FadeInUp key={card.title} delay={i * 0.05}>
              <div className="glass-card p-6 hover-lift h-full flex flex-col">
                <div className="glass-icon-box mb-4 h-12 w-12">
                  <card.icon size={22} className="text-primary" strokeWidth={2} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-2 leading-snug">{card.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.body}</p>
                {card.tip && (
                  <div className="guide-note-tip mt-3 leading-relaxed flex items-start gap-2">
                    <Lightbulb className="mt-[2px] h-4 w-4 shrink-0" />
                    <span>{card.tip}</span>
                  </div>
                )}
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationSection;
