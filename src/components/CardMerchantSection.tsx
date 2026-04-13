import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, FadeInUp } from "./AnimatedSection";
import { Lightbulb } from "lucide-react";

const tabs = ["개인사업자", "법인사업자"] as const;

/** 본문 포인트 핑크(`primary`)보다 한 톤 연한 라벨 */
const guideRowLabelClass = "font-bold text-primary/72 md:text-primary/68";

const commonBasicDocs = {
  title: "개인 · 법인 사업자 공통 기본 서류 — 신규",
  items: [
    "사업자 등록증 사본",
    "결제 대금 수령용 통장 사본",
    "대표자 신분증, 연락처, 이메일",
    "간판 사진 2장 (각도 다르게) + 내부 사진 2장",
    "공동 대표 시: 신분증·연락처 + 사업자 공인인증서 전자서명",
  ],
  note: "※ 간판 없는 경우: 매장 전경 사진 1장 + 도로명 주소 사진 1장 필수",
};

const newApplyGuide = [
  { label: "최초 신청", desc: "해당 사업자로 가맹신청을 처음 하시는 경우" },
  { label: "복수 가맹", desc: "이미 가맹점이 있으나, 기존과 다른 입금 계좌를 등록하려는 경우" },
  { label: "사업자 변경", desc: "개인에서 법인으로 전환되었거나 사업자번호가 변경된 경우" },
];

const existingApplyGuide = [
  { label: "동일 계좌", desc: "이미 가맹 신청 이력이 있으며, 기존과 동일한 입금 계좌를 사용하는 경우" },
  { label: "단순 추가", desc: "동일 사업장 내에서 단말기만 추가로 설치하시는 경우" },
];

const personalExistingDocs = {
  title: "개인사업자 — 기존",
  items: ["사업자 등록증 사본", "대표자 신분증, 연락처, 이메일"],
};

const corpExtraDocs = {
  title: "법인사업자 — 신규 ( 기본 서류 이외의 필요 서류)",
  items: ["법인 인감 증명서 + 법인 등기부 등본", "주주 명부", "법인 담당자 연락처 및 이메일"],
  note: "※ 모든 법인 서류는 최근 3개월 이내 발급분 준비 / 법인 공인인증서 전자서명 수반",
};

const DocBlock = ({ title, items, note }: { title: string; items: string[]; note?: string }) => (
  <div className="glass-card p-6 md:p-7 mb-4">
    <h4 className="text-base font-bold text-primary mb-4">{title}</h4>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed">
          <span className="w-2 h-2 rounded-full bg-primary/70 shrink-0 mt-2" />
          {item}
        </li>
      ))}
    </ul>
    {note && (
      <div className="guide-note mt-4 leading-relaxed">
        {note}
      </div>
    )}
  </div>
);

const CardMerchantSection = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("개인사업자");

  return (
    <section id="infra" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          num="04"
          tag="Step 4 — 런칭 인프라"
          title="카드 가맹 및 행정 서류"
          subtitle="사업자 유형별 카드 가맹 신청 구비서류 안내"
        />

        <FadeInUp>
          <div className="flex items-center gap-1 p-1 rounded-xl glass-tabs-track w-fit mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative isolate min-w-[7.5rem] px-6 py-3 text-base font-semibold rounded-lg transition-colors ${
                  activeTab === tab ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeMerchantTab"
                    className="absolute inset-0 z-0 rounded-lg bg-primary shadow-md shadow-primary/25"
                    transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </FadeInUp>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 0.1, 0.22, 1] }}
          >
            {activeTab === "개인사업자" ? (
              <>
                <DocBlock {...commonBasicDocs} />
                <DocBlock {...personalExistingDocs} />
              </>
            ) : (
              <>
                <DocBlock {...commonBasicDocs} />
                <DocBlock {...corpExtraDocs} />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <FadeInUp delay={0.04}>
          <div className="mt-10 md:mt-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <h4 className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-primary">
                  <span className="text-lg font-bold tracking-tight md:text-xl">신규</span>
                  <span className="text-base font-bold md:text-lg" aria-hidden>
                    ㅡ
                  </span>
                  <span className="text-xs font-medium md:text-sm">최초 신청 / 복수 가맹 / 사업자 변경</span>
                </h4>
                <div className="mt-2 h-px w-full bg-neutral-400/80" />
                <ul className="mt-4 space-y-3.5">
                  {newApplyGuide.map((item) => (
                    <li key={item.label} className="grid grid-cols-[6.25rem_minmax(0,1fr)] gap-x-3 gap-y-1 text-[0.9375rem] leading-snug md:grid-cols-[6.75rem_minmax(0,1fr)] md:text-base md:leading-relaxed">
                      <span className={guideRowLabelClass}>{item.label}</span>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-primary">
                  <span className="text-lg font-bold tracking-tight md:text-xl">기존</span>
                  <span className="text-base font-bold md:text-lg" aria-hidden>
                    ㅡ
                  </span>
                  <span className="text-xs font-medium md:text-sm">동일 계좌 / 단순 추가</span>
                </h4>
                <div className="mt-2 h-px w-full bg-neutral-400/80" />
                <ul className="mt-4 space-y-3.5">
                  {existingApplyGuide.map((item) => (
                    <li key={item.label} className="grid grid-cols-[6.25rem_minmax(0,1fr)] gap-x-3 gap-y-1 text-[0.9375rem] leading-snug md:grid-cols-[6.75rem_minmax(0,1fr)] md:text-base md:leading-relaxed">
                      <span className={guideRowLabelClass}>{item.label}</span>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 border-t border-neutral-300/70 pt-8 md:mt-12 md:pt-9">
              <p className="flex items-center gap-2 text-base font-bold text-primary md:text-lg">
                <Lightbulb className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                확인해 주세요!
              </p>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
                동일한 사업자라도 <span className="font-semibold text-foreground">정산 계좌</span>가 달라지면{" "}
                <span className="font-semibold text-primary">신규</span>로 접수해 주셔야 하며, 제출 서류 또한{" "}
                <span className="font-semibold text-primary">신규 기준</span>과 동일합니다.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default CardMerchantSection;
