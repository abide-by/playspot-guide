import { useMemo, useRef, useState } from "react";
import { SectionHeader, SubLabel, FadeInUp } from "./AnimatedSection";
import { ClipboardList, Ruler, MapPin, Map, Phone, Camera, Car, Building2, ArrowUpDown, DoorOpen } from "lucide-react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const requestItems = [
  { icon: ClipboardList, title: "사업자 등록증", desc: "사업자 등록증 사본을 준비해 주세요." },
  { icon: Ruler, title: "설치 공간 실측 치수", desc: "직접 잰 실측 치수가 있다면 말씀해주세요." },
  { icon: MapPin, title: "설치 주소", desc: "정확한 설치 예정 주소를 알려주세요." },
  { icon: Map, title: "설치할 장소의 도면", desc: "도면이 없다면 가로(mm) × 세로(mm) 실측 값을 보내주셔도 좋습니다." },
  { icon: Phone, title: "담당자 성함 · 연락처 · 이메일", desc: "시안 전달 및 소통을 위한 담당자 정보를 입력해 주세요." },
  { icon: Camera, title: "매장 안의 사진", desc: "3장 이상의 전면, 측면, 후면 사진이 필요합니다. 사진은 많을수록 좋습니다." },
];

const checklistItems = [
  { icon: Car, label: "주차 및 하역", desc: "설치 차량의 주차 공간 확보 및 머신 하역이 가능한 지면 확인" },
  { icon: Building2, label: "이동 경로", desc: "하역 지점부터 설치 장소까지의 계단, 높은 문턱 등 진입 방해 요소 사전 확인" },
  { icon: ArrowUpDown, label: "승강기 확인", desc: "화물 전용 승강기 유무 확인. 일반 승강기 이용 시 건물 관리실을 통해 중량물 운반 가능 여부 사전 협의 필수" },
  { icon: DoorOpen, label: "최종 진입", desc: "출입문 폭 실측(머신 규격 대비) 및 설치 위치 인근 상시 전원(220V 콘센트) 확보" },
];

const SpaceDesignSection = () => {
  const checklistRef = useRef<HTMLDivElement | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    const el = checklistRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elTop = rect.top;
    const elCenter = rect.top + rect.height / 2;

    // Progress is 0 when viewport center hits element top,
    // and becomes 1 when element center aligns with viewport center.
    const denom = Math.max(1, elCenter - elTop); // == rect.height / 2
    const raw = (viewportCenter - elTop) / denom;
    const v = Math.min(1, Math.max(0, raw));

    const n = checklistItems.length;
    const next = Math.min(n, Math.max(0, Math.round(v * n)));
    setActiveCount(next);
  });

  const checked = useMemo(() => checklistItems.map((_, i) => i < activeCount), [activeCount]);

  return (
    <section id="design" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          num="02"
          tag="Step 2 — 맞춤 공간 설계"
          title="3D 시안 제작 & 현장 변수 체크"
          subtitle="3D 배치 시안 제작을 위한 필수 정보와 현장 설치 전 사전 확인 사항"
        />

        <SubLabel>— 3D 시안 제작을 위한 정보 요청</SubLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mb-16 items-stretch">
          {requestItems.map((item, i) => (
            <div key={item.title} className="h-full min-h-0 min-w-0 flex flex-col">
              <FadeInUp delay={i * 0.05} className="min-h-0 flex flex-1 flex-col">
                <div className="glass-card p-5 flex items-start gap-4 hover-lift flex-1 min-h-0 min-w-0">
                  <div className="glass-icon-box h-11 w-11">
                    <item.icon size={20} className="text-primary" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col gap-1">
                    <div className="text-base font-semibold text-foreground leading-snug">{item.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          ))}
        </div>

        <SubLabel>— 현장 설치 환경 핵심 체크리스트</SubLabel>
        <div ref={checklistRef} className="space-y-3 mb-6">
          {checklistItems.map((item, i) => (
            <FadeInUp key={item.label} delay={i * 0.05} className="min-h-0">
              <div
                role="group"
                className={`w-full glass-card p-5 flex items-start gap-4 text-left transition-all duration-300 min-h-0 ${
                  checked[i] ? "border-primary/40 pink-glow" : ""
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checked[i]
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {checked[i] && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
                    </svg>
                  )}
                </div>
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="glass-icon-box-sm mt-0.5">
                    <item.icon size={16} className="text-primary" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col gap-1">
                    <span className="text-base font-semibold text-foreground leading-snug">{item.label}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="guide-note leading-relaxed">
            ※ 주의 사항: 현장 여건 및 설치 공정에 따라 추가 비용이 발생하거나 일정이 일부 변동될 수 있는 점 참고 부탁드립니다.
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default SpaceDesignSection;
