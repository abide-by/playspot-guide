import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeInUp } from "./AnimatedSection";

const steps = [
  { num: "01", title: "도입 FAQ", desc: "기기 특징 및 운영 방식 문답" },
  { num: "02", title: "머신 라인업", desc: "자동/수동 머신 상세 비교" },
  { num: "03", title: "런칭 인프라", desc: "카드 가맹, 네트워크, 전력" },
  { num: "04", title: "운영 & 설치", desc: "상품 준비, 교육, 프로세스" },
];

const HeroSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
    <div className="max-w-4xl mx-auto text-center">
      <FadeInUp>
        <span className="inline-block text-sm font-medium tracking-[0.3em] uppercase text-primary mb-6 px-4 py-2 glass-pill border-primary/25">
          Master Guide
        </span>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
          창업 파트너 <em className="not-italic text-gradient">가이드</em>
        </h1>
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          PLAY SPOT 창업의 처음부터 끝까지, 머신 선택부터 현장 설치·운영 교육까지 필요한 모든 정보를 단계별로 안내합니다.
        </p>
      </FadeInUp>

      <FadeInUp delay={0.4}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={false}
              whileHover={{
                y: -4,
                boxShadow:
                  "0 12px 40px -14px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.65) inset, 0 0 36px -14px hsl(340 82% 52% / 0.12)",
              }}
              transition={{ type: "tween", duration: 0.09, ease: "easeOut" }}
              className="glass-card p-5 text-left"
            >
              <span className="text-2xl font-bold text-gradient">{step.num}</span>
              <div className="text-base font-semibold text-foreground mt-2 leading-snug">{step.title}</div>
              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </FadeInUp>
    </div>

    <motion.div
      className="absolute bottom-10 animate-bounce-slow"
    >
      <ChevronDown className="text-muted-foreground" size={24} />
    </motion.div>
  </section>
);

export default HeroSection;
