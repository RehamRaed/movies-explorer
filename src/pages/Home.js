import HeroSection from '../components/HeroSection';
import TrendingSection from '../components/TrendingSection';
import PopularSection from '../components/PopularSection';
import JoinSection from '../components/JoiningSection';
import "../styles/Home.css";
import FreeWatchSection from '../components/FreeWatchSection';

function Home() {
  return (
    <>
    <HeroSection />
    <TrendingSection />
    <PopularSection />
    <FreeWatchSection />
    <JoinSection />
    </>
  );
}

export default Home;