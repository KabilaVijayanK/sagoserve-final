import Navbar from "@/components/Navbar";
import IntroSection from "@/components/IntroSection";
import IntroDividerText from "../components/IntroDividerText";
import AboutScrollSection from "../components/AboutScrollSection";
import QualityPage from "../components/QualityPage";
import UniqueIdeasHoverSection from "@/components/UniqueIdeasHoverSection";
import TapiocaBenefitsPage from "@/components/TapiocaBenefitsPage";
import IndustrialUses from "@/components/IndustrialUses";
import TapiocaRecipesPage from "@/components/TapiocaRecipesPage";
import HeroUltra from "@/components/HeroUltra";
import ExcellenceSection from "@/components/ExcellenceSection";
import ServicesSection from "@/components/ServicesSection";
import TapiocaHighlight from "@/components/TapiocaHighlight";
import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import ProductsSection from "@/components/ProductsSection";
import ScrollingText from "@/components/ScrollingText";
import StartUsingSection from "@/components/StartUsingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Blog from "@/components/Blog";
import Gallery from "@/components/GallerySection";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <IntroSection />
      {/* <IntroDividerText />  */}
    
    {/* <AboutScrollSection /> */}

      <HeroUltra />
      <ServicesSection />
       <ProductsSection />
       <AchievementsSection />
       <TapiocaRecipesPage />
       <TapiocaBenefitsPage />
       <IndustrialUses />
      <Gallery />
      <TestimonialsSection />
      <Blog />
       {/* <QualityPage /> */}
      {/* <ExcellenceSection /> */}
{/* <UniqueIdeasHoverSection /> */}
      {/* <TapiocaHighlight /> */}
      {/* <AboutSection /> */}
      <NewsletterSection />
      {/* <ScrollingText /> */}
      
     
      
      
      <Footer />
    </main>
  );
};

export default Index;