import { SectionHeader, FadeInUp } from "./AnimatedSection";
import { Phone, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contacts = [
  {
    category: "긴급 및 기타",
    dept: "대 표",
    tasks: "야간/공휴일 긴급 문의 대응\n부서 외 기타 제반 사항 안내",
    name: "임건치 대표",
    phone: "010-8856-9327",
    email: "fun_n_joy@naver.com",
  },
  {
    category: "수동 머신 및 상품",
    dept: "물 류 팀",
    tasks: "수동 머신 임대 안내\n가챠 상품 수급 및 배송 문의",
    name: "양은실 실장",
    phone: "010-6692-5479",
    email: "fun_n_joy@naver.com",
  },
  {
    category: "계약 및 견적",
    dept: "영 업 팀",
    tasks: "자동 머신·코인 교환기 구매 상담\n신규 계약 체결 및 견적서 산출",
    name: "동근영 대리",
    phone: "010-8024-7715",
    email: "gydong@playspot.co.kr",
  },
  {
    category: "설치 및 A/S",
    dept: "설 치 팀",
    tasks: "머신 현장 설치 및 프로세스 안내\n장애 접수 및 기술 지원(A/S)",
    name: "정용훈 팀장",
    phone: "010-2045-4512",
    email: "yhjung@playspot.co.kr",
  },
];

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} 클립보드에 복사되었습니다`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
    >
      {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
      <span>{text}</span>
    </button>
  );
};

const ContactSection = () => (
  <section id="contact" className="py-32 px-6">
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        num="07"
        tag="Step 7 — 파트너십 지원"
        title="업무별 담당 센터"
        subtitle="긴급 상황부터 기술 지원까지 원스톱 연락망"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((c, i) => (
          <FadeInUp key={c.dept} delay={i * 0.05}>
            <div className="glass-card p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-primary font-medium">{c.category}</span>
                <span className="text-xs font-bold text-foreground tracking-widest bg-secondary/50 px-3 py-1 rounded-full">
                  {c.dept}
                </span>
              </div>
              <p className="text-xs text-muted-foreground whitespace-pre-line mb-4 leading-relaxed">{c.tasks}</p>
              <div className="border-t border-border/30 pt-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-primary" />
                  <CopyButton text={c.phone} label="전화번호가" />
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-primary" />
                  <CopyButton text={c.email} label="이메일이" />
                </div>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
