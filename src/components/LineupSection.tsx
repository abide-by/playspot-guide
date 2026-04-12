import { motion } from "framer-motion";
import { SectionHeader, FadeInUp } from "./AnimatedSection";
import { Cpu, Wrench } from "lucide-react";

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

const LineupSection = () => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={false}
            whileHover={{ y: -2 }}
            transition={{ type: "tween", duration: 0.09, ease: "easeOut" }}
            className="glass-card p-6 md:p-7"
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
              </div>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {autoHighlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-primary font-bold shrink-0">·</span>
                  <span>{parseBold(line)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            whileHover={{ y: -2 }}
            transition={{ type: "tween", duration: 0.09, ease: "easeOut" }}
            className="glass-card p-6 md:p-7"
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
              </div>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {manualHighlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-sky-800 font-bold shrink-0">·</span>
                  <span>{parseBold(line)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
    </div>
  </section>
);

export default LineupSection;
