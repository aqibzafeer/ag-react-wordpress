import HeroSection from "../components/HeroSection";
import CategoryGrid from "../components/CategoryGrid";
import FeatureSection from "../components/FeatureSection";
import BuySection from "../components/BuySection";
import OurValues from "../components/OurValues";
import HomeNewArrivals from "../components/HomeNewArrivals";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />      
      <FeatureSection />
      <HomeNewArrivals />
      <BuySection/>
      <OurValues />
    </div>
  );
}

export default Home;
