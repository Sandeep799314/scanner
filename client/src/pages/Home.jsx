import Navbar from "../componenets/layout/Navbar";
import HeroSection from "../componenets/sections/HeroSection";
import FeaturesSection from "../componenets/sections/FeaturesSection";
import HowItWorks from "../componenets/sections/HowItWorks";
import ScanSection from "../componenets/sections/ScanSection";
import Testimonials from "../componenets/sections/Testimonials";
import CTASection from "../componenets/sections/CTASection";
import Footer from "../componenets/layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-main-gradient">

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Scanner Section */}
      <ScanSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Call To Action */}
      <CTASection />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;