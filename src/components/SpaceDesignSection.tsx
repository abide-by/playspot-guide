import { useState } from "react";
import { SectionHeader, SubLabel, FadeInUp } from "./AnimatedSection";
import { ClipboardList, Ruler, MapPin, Map, Phone, Camera, Car, Building2, ArrowUpDown, DoorOpen } from "lucide-react";

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
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {requestItems.map((item, i) => (
            <FadeInUp key={item.title} delay={i * 0.05}>
              <div className="glass-card p-5 flex items-start gap-4 hover-lift">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        <SubLabel>— 현장 설치 환경 핵심 체크리스트</SubLabel>
        <div className="space-y-3 mb-6">
          {checklistItems.map((item, i) => (
            <FadeInUp key={item.label} delay={i * 0.05}>
              <button
                onClick={() => toggle(i)}
                className={`w-full glass-card p-5 flex items-start gap-4 text-left transition-all duration-300 ${
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
                <div className="flex items-start gap-3 flex-1">
                  <item.icon size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              </button>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="text-xs text-muted-foreground bg-secondary/50 rounded-xl p-4 border border-border/30">
            ※ 주의 사항: 현장 여건 및 설치 공정에 따라 추가 비용이 발생하거나 일정이 일부 변동될 수 있는 점 참고 부탁드립니다.
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default SpaceDesignSection;
