import HeroSection from "@/components/custom/hero-section";
import { getHomePageData } from "@/data/strapi/loaders";

export default async function Home() {
  const homeData = await getHomePageData();

  return (
    <main>
      <HeroSection />
    </main>
  );
}
