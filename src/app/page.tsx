import { getHomePageData } from "@/data/strapi/loaders";

export default async function Home() {
  const homeData = await getHomePageData();
  
  return (
    <main>
      <div>
        <h2>Leonardo</h2>
      </div>
    </main>
  );
}
