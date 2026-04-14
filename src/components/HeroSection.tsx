import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeInUp } from "./AnimatedSection";

const steps = [
  { num: "01", title: "도입 FAQ", desc: "비즈니스·기기·결제·설치 등 핵심 문의 정리", href: "#faq" },
  { num: "02", title: "맞춤 공간 설계", desc: "3D 시안·현장 변수 사전 점검", href: "#design" },
  { num: "03", title: "머신 라인업", desc: "자동·수동 제원 비교·현장 사진", href: "#lineup" },
  { num: "04", title: "카드 가맹", desc: "가맹 서류·사업자 유형별 구비 안내", href: "#infra" },
  { num: "05", title: "네트워크·전력", desc: "LTE·Wi-Fi·상시 전원 운영 환경", href: "#network" },
  { num: "06", title: "운영·설치", desc: "접수부터 설치·교육까지 진행 단계", href: "#operation" },
] as const;

const HeroSection = () => (
  <section className="relative flex min-h-screen min-h-dvh flex-col items-center px-6 pt-20 max-md:justify-start max-md:pb-10 max-md:pt-24 md:justify-center md:pb-28">
    <div className="max-w-4xl mx-auto w-full text-center">
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
          PLAY SPOT 창업의 처음부터 끝까지, FAQ·공간 설계·머신 선택부터 카드 가맹·네트워크·전력, 현장 설치·운영 교육까지 필요한 정보를 여섯 단계로 안내합니다.
        </p>
      </FadeInUp>

      <FadeInUp delay={0.4}>
        <div className="mt-16 grid grid-cols-2 items-stretch gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <motion.a
              key={step.num}
              href={step.href}
              initial={false}
              whileHover={{
                y: -4,
                boxShadow:
                  "0 12px 40px -14px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.65) inset, 0 0 36px -14px hsl(340 82% 52% / 0.12)",
              }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "tween", duration: 0.09, ease: "easeOut" }}
              className="glass-card flex h-full min-h-[11.5rem] flex-col p-5 text-left text-inherit no-underline outline-none ring-offset-2 ring-offset-[hsl(210_28%_97%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label={`${step.title} 섹션으로 이동`}
            >
              <span className="text-2xl font-bold text-gradient">{step.num}</span>
              <div className="mt-2 text-base font-semibold leading-snug text-foreground">{step.title}</div>
              <div className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</div>
            </motion.a>
          ))}
        </div>
      </FadeInUp>
    </div>

    {/* 모바일: 카드 아래 흐름으로 배치해 겹침 방지 / 데스크톱: 하단 고정 */}
    <motion.div
      className="pointer-events-none mt-14 flex w-full justify-center max-md:mb-1 max-md:opacity-75 md:absolute md:bottom-10 md:mt-0 md:w-auto md:opacity-100 md:left-1/2 md:-translate-x-1/2 animate-bounce-slow"
      aria-hidden
    >
      <ChevronDown className="text-muted-foreground" size={24} />
    </motion.div>
  </section>
);

export default HeroSection;
