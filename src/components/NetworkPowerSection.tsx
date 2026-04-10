import { SectionHeader, SubLabel, FadeInUp } from "./AnimatedSection";
import { Satellite, Link2, Coins, Zap, ShieldCheck, CircuitBoard, Smartphone, Settings2 } from "lucide-react";

const widgets = [
  {
    icon: Satellite,
    title: "LTE 단말기 필수 신청",
    body: "설치 대수와 무관하게 최소 LTE 단말기 1대 신청 필수.",
  },
  {
    icon: Link2,
    title: "세트 구성",
    body: "LTE 단말기 + 전용 Wi-Fi 공유기는 하나의 세트로 판매 제공. 통신 안정성 보장을 위한 필수 구성.",
  },
  {
    icon: Coins,
    title: "월 통신료",
    body: "서비스 이용 시 별도 월 통신료 발생. 정확한 금액은 영업팀에 문의 바랍니다.",
  },
];

const powerSpecs = [
  { icon: Zap, text: <>머신 1대당 <strong className="text-foreground">평균 0.15A</strong>, 최대 0.33A 소모</> },
  { icon: Zap, text: <>설치 대수 × 0.33A 이상의 설비 용량 확보 필수</> },
  { icon: CircuitBoard, text: <>전압 안정을 위해 <strong className="text-foreground">단독 회로 구성</strong> 권장</> },
  { icon: ShieldCheck, text: <><strong className="text-foreground">30A 차단기</strong> 설치 권장</> },
  { icon: Zap, text: <>설치 전 분전반 차단기 용량 사전 확인</> },
  { icon: Zap, text: <>콘센트 위치 및 머신 수량에 따라 추가 설비 가능</> },
];

const NetworkPowerSection = () => (
  <section id="network" className="py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <SectionHeader
        num="05"
        tag="Step 5 — 스마트 네트워크 솔루션"
        title="LTE 전용 네트워크 & 전력"
        subtitle="플레이 큐브(자동 머신) 안정적 운영을 위한 통신·전기 환경 안내"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {widgets.map((w, i) => (
          <FadeInUp key={w.title} delay={i * 0.05}>
            <div className="glass-card p-6 hover-lift h-full">
              <div className="glass-icon-box mb-4 h-12 w-12">
                <w.icon size={22} className="text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-base font-semibold text-foreground mb-2 leading-snug">{w.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{w.body}</p>
            </div>
          </FadeInUp>
        ))}
      </div>

      {/* App Fee Box */}
      <FadeInUp>
        <div className="glass-card p-6 mb-4 pink-glow">
          <div className="flex items-start gap-3 mb-3">
            <div className="glass-icon-box-sm mt-0.5 shrink-0">
              <Smartphone size={15} className="text-primary" strokeWidth={2} />
            </div>
            <h4 className="text-base font-bold text-foreground leading-snug">플레이스팟 앱 (원격 관리) 이용 요금 안내</h4>
          </div>
          <p className="text-base text-muted-foreground mb-3 leading-relaxed">플레이스팟 앱은 파트너사님의 원활한 초기 세팅을 돕기 위해 <strong className="text-foreground">최초 2개월간 무상</strong>으로 제공됩니다.</p>
          <p className="text-base text-muted-foreground mb-3 leading-relaxed">무상 지원 기간 종료 이후에는 유료 서비스로 전환되지만, 서비스 연장을 원치 않으실 경우 원격 관리 앱 사용만 제한될 뿐입니다. <strong className="text-foreground">머신의 현장 결제나 기본 운영에는 어떠한 영향이나 불이익도 발생하지 않습니다.</strong></p>
          <p className="text-sm text-muted-foreground leading-relaxed">※ 플레이스팟 앱의 매출은 <strong className="text-foreground">참고용</strong>으로 보시는 것을 권장드리며, 자세한 내역은 <a href="https://nibs.nicevan.co.kr/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">nibs.nicevan.co.kr</a>에서 확인하시는 것을 추천드립니다.</p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.05}>
        <div className="glass-card p-6 mb-12">
          <div className="flex items-start gap-3 mb-3">
            <div className="glass-icon-box-sm mt-0.5 shrink-0">
              <Settings2 size={15} className="text-primary" strokeWidth={2} />
            </div>
            <h4 className="text-base font-bold text-foreground leading-snug">단말기 사업자 세팅 변경 비용 안내</h4>
          </div>
          <p className="text-base text-muted-foreground mb-2 leading-relaxed">단말기 사업자 세팅 변경이 필요한 경우 <strong className="text-foreground">건당 15,000원 (VAT 별도)</strong>의 비용이 발생합니다.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">※ A/S 출장비는 별도로 산정됩니다.</p>
        </div>
      </FadeInUp>

      <SubLabel>— 전기 설비 권장 사양</SubLabel>
      <div className="space-y-3">
        {powerSpecs.map((spec, i) => (
          <FadeInUp key={i} delay={i * 0.03}>
            <div className="glass-card px-5 py-5 md:px-6 md:py-5 flex flex-row items-center justify-start gap-4 text-left">
              <div className="glass-icon-box-sm shrink-0">
                <spec.icon size={15} className="text-primary" strokeWidth={2} />
              </div>
              <span className="text-base text-muted-foreground leading-relaxed flex-1 min-w-0">
                {spec.text}
              </span>
            </div>
          </FadeInUp>
        ))}
      </div>
    </div>
  </section>
);

export default NetworkPowerSection;
