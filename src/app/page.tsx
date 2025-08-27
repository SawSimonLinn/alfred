import Header from "@/components/layout/header";
import HeroSection from "@/components/landing/hero";
import AboutSection from "@/components/landing/about";
import SkillsSection from "@/components/landing/skills";
import ExperienceSection from "@/components/landing/experience";
import PortfolioSection from "@/components/landing/portfolio";
import StyleIdentifierSection from "@/components/landing/style-identifier";
import ContactSection from "@/components/landing/contact";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div id="about" className="scroll-mt-24">
          <div className="h-20 w-full grid-pattern" />
          <AboutSection />
        </div>
        <div id="skills" className="scroll-mt-24">
          <div className="h-20 w-full grid-pattern" />
          <SkillsSection />
        </div>
        <div id="experience" className="scroll-mt-24">
          <div className="h-20 w-full grid-pattern" />
          <ExperienceSection />
        </div>
        <div id="portfolio" className="scroll-mt-24">
          <div className="h-20 w-full grid-pattern" />
          <PortfolioSection />
        </div>
        <div id="style-identifier" className="scroll-mt-24">
          <div className="h-20 w-full grid-pattern" />
          <StyleIdentifierSection />
        </div>
        <div id="contact" className="scroll-mt-24">
          <div className="h-20 w-full grid-pattern" />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
