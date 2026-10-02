import { AboutSection } from "@/components/sections/about/about-section";
import { ConnectSection } from "@/components/sections/connect/connect-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { CurrentFocus } from "@/components/sections/focus/current-focus";
import { Hero } from "@/components/sections/hero/hero";
import { JourneySection } from "@/components/sections/journey/journey-section";
import { SelectedWork } from "@/components/sections/projects/selected-work";
import { RecognitionSection } from "@/components/sections/recognition/recognition-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <SelectedWork />
      <AboutSection />
      <SkillsSection />
      <JourneySection />
      <CurrentFocus />
      <RecognitionSection />
      <ConnectSection />
      <ContactSection />
    </main>
  );
}
