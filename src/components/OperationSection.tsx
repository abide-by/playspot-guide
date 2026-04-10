import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader, SubLabel, FadeInUp } from "./AnimatedSection";
import { Package, Truck, Image } from "lucide-react";

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
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
        <div ref={timelineRef} className="relative pl-8 mb-16">
          {/* Progress line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border/30" />
          <motion.div
            className="absolute left-3 top-0 w-0.5 bg-primary origin-top"
            style={{ scaleY, height: "100%" }}
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <FadeInUp key={step.num} delay={i * 0.08}>
                <div className="relative">
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">{step.num}</span>
                  </div>
                  <div className="glass-card p-5 ml-2">
                    <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
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
                <card.icon size={24} className="text-primary mb-4" />
                <h4 className="text-sm font-semibold text-foreground mb-2">{card.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{card.body}</p>
                {card.tip && (
                  <div className="text-xs text-primary bg-primary/10 rounded-lg p-3 mt-3 border border-primary/20">
                    💡 {card.tip}
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
