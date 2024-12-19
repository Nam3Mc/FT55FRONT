import FeatureDepartments from "@/components/home/featureDepartment/featureDepartment";
import FeatureHouses from "@/components/home/featureHouse/featureHouse";
import HeroHome from "@/components/home/hero/hero";
import HeroOwner from "@/components/home/heroOwner/heroOwner";

export default function Home() {
  return (
    <div>
      <main>
        <HeroHome />
        <FeatureHouses />
        <FeatureDepartments />
        <HeroOwner />
      </main>
    </div>
  );
}
