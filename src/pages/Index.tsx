import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import SpaceDesignSection from "@/components/SpaceDesignSection";
import LineupSection from "@/components/LineupSection";
import CardMerchantSection from "@/components/CardMerchantSection";
import NetworkPowerSection from "@/components/NetworkPowerSection";
import OperationSection from "@/components/OperationSection";
import ContactSection from "@/components/ContactSection";
import BackToTopButton from "@/components/BackToTopButton";
import FloatingSectionNav from "@/components/FloatingSectionNav";

const Index = () => (
  <div className="page-glass-bg text-foreground">
    <Navigation />
    <HeroSection />
    <FAQSection />
    <SpaceDesignSection />
    <LineupSection />
    <CardMerchantSection />
    <NetworkPowerSection />
    <OperationSection />
    <ContactSection />
    <FloatingSectionNav />
    <BackToTopButton />
    <footer className="py-12 text-center text-sm text-muted-foreground border-t border-white/40 bg-white/22 backdrop-blur-xl">
      © PLAY SPOT. All rights reserved.
    </footer>
  </div>
);

export default Index;
