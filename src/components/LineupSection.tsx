import { motion } from "framer-motion";
import { SectionHeader, FadeInUp } from "./AnimatedSection";

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

const LineupSection = () => (
  <section id="lineup" className="py-32 px-6">
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        num="03"
        tag="Step 3 — 라인업 비교"
        title="플레이 큐브 vs 플레이 수동 머신"
        subtitle="머신 타입별 상세 제원 및 특징 비교"
      />

      <FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Auto Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 pink-glow transition-shadow duration-300"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">자동</span>
              <h3 className="text-xl font-bold text-foreground">플레이 큐브</h3>
            </div>
            <div className="space-y-4">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between items-start gap-4">
                  <span className="text-xs text-muted-foreground shrink-0 w-24">{s.label}</span>
                  <span className="text-sm text-foreground text-right">{s.auto}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Manual Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 hover:border-muted-foreground/30 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold">수동</span>
              <h3 className="text-xl font-bold text-foreground">플레이 수동 머신</h3>
            </div>
            <div className="space-y-4">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between items-start gap-4">
                  <span className="text-xs text-muted-foreground shrink-0 w-24">{s.label}</span>
                  <span className="text-sm text-foreground text-right">{s.manual}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </FadeInUp>

      {/* Shared rows */}
      <FadeInUp delay={0.1}>
        <div className="glass-card p-6 space-y-4">
          <div>
            <span className="text-xs text-muted-foreground">A/S</span>
            <p className="text-sm text-foreground mt-1">설치일 기준 신품 1년 / 중고 2개월 무상 A/S (사용자 과실 제외)</p>
          </div>
          <div className="border-t border-border/30 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-bold text-primary mb-2 block">자동 운영 가이드</span>
              <p className="text-sm text-muted-foreground">다양한 간편 결제 수단을 지원하며, 결제 및 매출 내역이 실시간으로 동기화되어 별도의 대조 작업 없이 편리한 운영이 가능합니다.</p>
            </div>
            <div>
              <span className="text-xs font-bold text-muted-foreground mb-2 block">수동 운영 가이드</span>
              <p className="text-sm text-muted-foreground">원활한 운영을 위해 전용 코인 사용을 권장해 드립니다. 다만, 상황에 따라 <strong className="text-foreground">전용 코인이 혼용될 가능성</strong>이 있으니 관리 시 이 점 유의해 주시기 바랍니다.</p>
            </div>
          </div>
        </div>
      </FadeInUp>
    </div>
  </section>
);

export default LineupSection;
