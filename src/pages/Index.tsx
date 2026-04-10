import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import SpaceDesignSection from "@/components/SpaceDesignSection";
import LineupSection from "@/components/LineupSection";
import CardMerchantSection from "@/components/CardMerchantSection";
import NetworkPowerSection from "@/components/NetworkPowerSection";
import OperationSection from "@/components/OperationSection";
import ContactSection from "@/components/ContactSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <HeroSection />
    <FAQSection />
    <SpaceDesignSection />
    <LineupSection />
    <CardMerchantSection />
    <NetworkPowerSection />
    <OperationSection />
    <ContactSection />
    <footer className="py-12 text-center text-xs text-muted-foreground border-t border-border/30">
      © PLAY SPOT. All rights reserved.
    </footer>
  </div>
);

export default Index;
