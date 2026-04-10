import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, FadeInUp } from "./AnimatedSection";

const tabs = ["개인사업자", "법인사업자"] as const;

const personalDocs = {
  new: {
    title: "개인사업자 — 신규",
    items: [
      "사업자 등록증 사본",
      "결제 대금 수령용 통장 사본",
      "대표자 신분증, 연락처, 이메일",
      "간판 사진 2장 (각도 다르게) + 내부 사진 2장",
      "공동 대표 시: 신분증·연락처 + 사업자 공인인증서 전자서명",
    ],
    note: "※ 간판 없는 경우: 매장 전경 사진 1장 + 도로명 주소 사진 1장 필수",
  },
  existing: {
    title: "개인사업자 — 기존",
    items: ["사업자 등록증 사본", "대표자 신분증, 연락처, 이메일"],
  },
};

const corpDocs = {
  title: "법인사업자 — 신규",
  items: [
    "개인 기본 서류 일체",
    "법인 인감 증명서 + 법인 등기부 등본",
    "주주 명부",
    "법인 담당자 연락처 및 이메일",
  ],
  note: "※ 모든 법인 서류는 최근 3개월 이내 발급분 준비 / 법인 공인인증서 전자서명 수반",
};

const DocBlock = ({ title, items, note }: { title: string; items: string[]; note?: string }) => (
  <div className="glass-card p-6 mb-4">
    <h4 className="text-sm font-bold text-primary mb-4">{title}</h4>
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
          {item}
        </li>
      ))}
    </ul>
    {note && (
      <div className="text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3 mt-4 border border-border/30">
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
          <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50 w-fit mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "개인사업자" ? (
              <>
                <DocBlock {...personalDocs.new} />
                <DocBlock {...personalDocs.existing} />
              </>
            ) : (
              <>
                <DocBlock {...personalDocs.new} />
                <DocBlock {...corpDocs} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CardMerchantSection;
