import HeroHome from "@/components/home/hero/hero";
import HeroOwner from "@/components/home/heroOwner/heroOwner";
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
