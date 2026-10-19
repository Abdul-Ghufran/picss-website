import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResearchCapabilities } from "@/components/sections/ResearchCapabilities";
import { FeaturedResearch } from "@/components/sections/FeaturedResearch";
import { DatabaseSection } from "@/components/sections/DatabaseSection";
import { InitiativeSection } from "@/components/sections/InitiativeSection";
import { InternshipSection } from "@/components/sections/InternshipSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { InstitutionalTimeline } from "@/components/sections/InstitutionalTimeline";
import { CollaborationSection } from "@/components/sections/CollaborationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <HeroSection />
        <AboutSection />
        <ResearchCapabilities />
        <FeaturedResearch />
        <DatabaseSection />
        <InitiativeSection />
        <InternshipSection />
        <ImpactSection />
        <InstitutionalTimeline />
        <CollaborationSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
