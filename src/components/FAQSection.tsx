import { SectionHeader, SubLabel, FadeInUp } from "./AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  num: string;
  a: React.ReactNode;
}

const deviceFAQ: FAQItem[] = [
  {
    num: "Q1",
    q: "자동 머신과 수동 머신의 차이는 무엇인가요?",
    a: (
      <>
        <p className="mb-3">구동 방식에 따라 디지털(자동)과 아날로그(수동)으로 구분됩니다.</p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li>• <strong className="text-foreground">플레이 큐브</strong> (자동): 카드 및 간편결제 기반 운영</li>
          <li>• <strong className="text-foreground">플레이 수동 머신</strong> (수동): 전용 코인(동전) 또는 카드(교환기 연동 시) 사용</li>
        </ul>
      </>
    ),
  },
  {
    num: "Q2",
    q: "각 기기의 장단점은 무엇인가요?",
    a: (
      <ul className="space-y-1.5 text-muted-foreground">
        <li>• <strong className="text-foreground">플레이 큐브</strong>: 원격 제어 가능, 무인 운영 최적화. 초기 비용 2~3배 높음</li>
        <li>• <strong className="text-foreground">플레이 수동 머신</strong>: 초기 비용 저렴, 진입 장벽 낮음. 문제 발생 시 현장 방문 필요</li>
      </ul>
    ),
  },
  {
    num: "Q3",
    q: "호환되는 캡슐 사이즈는 어떻게 되나요?",
    a: (
      <ul className="space-y-1.5 text-muted-foreground">
        <li>• <strong className="text-foreground">자동 머신</strong>: 최소 45mm ~ 최대 92mm</li>
        <li>• <strong className="text-foreground">수동 머신</strong>: 최소 45mm ~ 최대 75mm</li>
      </ul>
    ),
  },
  {
    num: "Q4",
    q: "캡슐 최대 투입량은 어떻게 되나요?",
    a: (
      <>
        <p className="text-foreground font-medium text-base mb-2">자동 머신</p>
        <ul className="space-y-1 text-muted-foreground mb-4">
          <li>• 47~50mm: 160개 / 53~60mm: 140개</li>
          <li>• 60mm: 100개 / 62~70mm: 90개</li>
          <li>• 70mm: 85개 / 75mm: 60개 / 92mm: 40개</li>
        </ul>
        <p className="text-foreground font-medium text-base mb-2">수동 머신</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• 47~50mm: 180개 / 60mm: 100개</li>
          <li>• 70mm: 50개 / 75mm: 40개</li>
        </ul>
      </>
    ),
  },
];

const paymentFAQ: FAQItem[] = [
  {
    num: "Q5",
    q: "지원하는 결제 방식은 어떻게 되나요?",
    a: <p className="text-muted-foreground">신용/체크카드 전반 지원. 간편결제는 카카오페이, 토스페이, 네이버페이 사용 가능합니다.</p>,
  },
  {
    num: "Q6",
    q: "매출 수수료가 발생하나요?",
    a: <p className="text-muted-foreground">당사는 기기 직판 본사로, 별도 매출 수수료 없음. 운영 수익은 100% 점주 귀속입니다.</p>,
  },
  {
    num: "Q7",
    q: "기기 원격 관리 및 매출 확인은 어디서 하나요?",
    a: (
      <>
        <ul className="space-y-1.5 text-muted-foreground mb-3">
          <li>• 원격 제어: <a href="http://www.playspotapp.co.kr/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">www.playspotapp.co.kr</a></li>
          <li>• 정확한 매출·부가세 내역: <a href="https://nibs.nicevan.co.kr/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">nibs.nicevan.co.kr</a> (회원가입 후)</li>
        </ul>
        <div className="guide-note mt-2 leading-relaxed">
          플레이스팟 앱의 매출은 <strong className="text-foreground">참고용</strong>으로 보시는 것을 권장드리며, 자세한 내역은 <strong className="text-foreground">nibs</strong>에서 확인하시는 것을 추천드립니다.
        </div>
      </>
    ),
  },
  {
    num: "Q8",
    q: "플레이스팟 앱(원격 관리) 이용에 추가 비용이 발생하나요?",
    a: (
      <>
        <p className="text-muted-foreground mb-3">플레이스팟 앱은 파트너사님의 원활한 초기 세팅을 돕기 위해 <strong className="text-foreground">최초 2개월간 무상</strong>으로 제공됩니다. 무상 지원 기간 종료 이후에는 유료 서비스로 전환되지만, 연장을 원치 않으실 경우 원격 관리 앱 사용만 제한될 뿐입니다.</p>
        <div className="guide-note mt-3 leading-relaxed">
          머신의 현장 결제나 기본 운영에는 어떠한 영향이나 불이익도 발생하지 않습니다.
        </div>
      </>
    ),
  },
];

const scheduleFAQ: FAQItem[] = [
  {
    num: "Q9",
    q: "배송·설치까지 기간은 얼마나 소요되나요?",
    a: <p className="text-muted-foreground">결제 완료 기준 최소 4일 ~ 최대 10일 소요. 현장 스케줄에 따라 변동 가능합니다.</p>,
  },
  {
    num: "Q10",
    q: "설치에 필요한 환경이 있나요?",
    a: (
      <ul className="space-y-1.5 text-muted-foreground">
        <li>• <strong className="text-foreground">자동 머신</strong>: Wi-Fi 필수, 1대당 0.33A 전력 확보 필요</li>
        <li>• <strong className="text-foreground">수동 머신</strong>: 코인 교환기 사용 시 콘센트·Wi-Fi 필요</li>
      </ul>
    ),
  },
  {
    num: "Q11",
    q: "단말기 사업자 세팅 변경 시 비용이 발생하나요?",
    a: (
      <>
        <p className="text-muted-foreground mb-2">단말기 사업자 세팅 변경 시 <strong className="text-foreground">건당 15,000원 (VAT 별도)</strong>의 비용이 발생합니다.</p>
        <div className="guide-note mt-3 leading-relaxed">※ A/S 출장비는 별도로 산정됩니다.</div>
      </>
    ),
  },
  {
    num: "Q12",
    q: "배송 및 설치 비용은 별도인가요?",
    a: <p className="text-muted-foreground">전문 인력 방문 설치 시 현장 상황 확인 후 설치 비용이 별도 산정됩니다. 직접 수령 또는 화물 배송 시 세팅비 또는 화물 배송비만 청구됩니다.</p>,
  },
];

const asFAQ: FAQItem[] = [
  {
    num: "Q13",
    q: "A/S는 어떻게 진행되나요?",
    a: <p className="text-muted-foreground">기기 자체 결함 시 설치일로부터 <strong className="text-foreground">신품 1년 / 중고 2개월 무상 A/S</strong> 지원. 사용자 과실 및 외부 파손은 제외됩니다.</p>,
  },
  {
    num: "Q14",
    q: "캡슐 및 내부 상품 구매처는 어디인가요?",
    a: (
      <p className="text-muted-foreground">
        전용 도매몰 <strong className="text-foreground">플레이캡슐토이</strong>에서 구매 가능합니다.
        <br />
        <a href="https://playcapsuletoy.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline text-base break-all">https://playcapsuletoy.com</a>
      </p>
    ),
  },
  {
    num: "Q15",
    q: "렌탈도 가능한가요?",
    a: <p className="text-muted-foreground">장기 렌탈 불가. <strong className="text-foreground">단기(30일 이내) 팝업스토어·행사·이벤트 임대 렌탈</strong>만 지원합니다.</p>,
  },
  {
    num: "Q16",
    q: "야외 설치도 가능한가요?",
    a: <p className="text-muted-foreground">야외 설치는 가능하나, 기기 결함 방지를 위해 눈이나 비를 직접 맞지 않도록 반드시 <strong className="text-foreground">가림막(어닝 등)</strong>이 설치된 환경에 배치해 주셔야 합니다.</p>,
  },
];

const FAQGroup = ({ label, items }: { label: string; items: FAQItem[] }) => (
  <div className="mb-10">
    <SubLabel>{label}</SubLabel>
    <Accordion type="multiple" className="space-y-3">
      {items.map((item) => (
        <FadeInUp key={item.num}>
          <AccordionItem
            value={item.num}
            className="glass-faq-accordion px-6 overflow-hidden data-[state=open]:pink-glow"
          >
            <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline py-6 [&[data-state=open]]:pb-3">
              <span className="flex items-start gap-3">
                <span className="text-sm font-bold text-primary tabular-nums shrink-0 mt-0.5">{item.num}</span>
                <span className="leading-snug">{item.q}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-0 text-base leading-relaxed text-muted-foreground [&_strong]:text-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        </FadeInUp>
      ))}
    </Accordion>
  </div>
);

const FAQSection = () => (
  <section id="faq" className="py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <SectionHeader
        num="01"
        tag="Step 1 — 비즈니스 모델 선택"
        title="자주 묻는 질문 (FAQ)"
        subtitle="파트너사에서 가장 자주 문의하는 핵심 항목을 정리했습니다."
      />
      <FAQGroup label="— 기기 특징 및 장단점" items={deviceFAQ} />
      <FAQGroup label="— 결제 및 운영 방식" items={paymentFAQ} />
      <FAQGroup label="— 도입 일정 및 설치 환경" items={scheduleFAQ} />
      <FAQGroup label="— A/S 및 렌탈" items={asFAQ} />
    </div>
  </section>
);

export default FAQSection;
