import HeroHome from "@/components/home/hero/hero";
import HeroOwner from "@/components/home/heroOwner/heroOwner";
import HomeContainer from "@/components/home/home_container";

export default function Home() {
  return (
    <div>
      <main>
        <HeroHome />
        <HomeContainer/>
        <HeroOwner />
      </main>
    </div>
  );
}
