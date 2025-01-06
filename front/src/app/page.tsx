import HeroHome from "@/components/hero";
import HeroOwner from "@/components/heroOwner";
import HomeContainer from "@/components/home/home_container";

export const Home: React.FC = () => {
  return (
    <div>
      <HeroHome />
      <HomeContainer />
      <HeroOwner />
    </div>
  );
};
export default Home;
