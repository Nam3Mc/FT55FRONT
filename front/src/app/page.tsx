import HeroHome from "@/components/hero";
import HeroOwner from "@/components/heroOwner";
import HomeContainer from "@/components/home/home_container";
import Support from "@/components/home/support/support";

export const Home: React.FC = () => {
  return (
    <div>
      <main>
        <HeroHome />
        <HomeContainer />
        <HeroOwner />
        <Support />
      </main>
    </div>
  );
};
export default Home;
