import { getPage } from "@/data/cms";
import { resolvePage } from "@/data/pages/resolvePage";
import type { HomePageData } from "@/types/components/pages/home/HomePage.types";

export async function getHomePageData(): Promise<HomePageData> {
	const page = await getPage("/");
	return resolvePage(page);
}
