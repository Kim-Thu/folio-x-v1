import { getPage } from "@/data/cms";
import type { HomePageData } from "@/types/components/pages/home/HomePage.types";

export async function getHomePageData(): Promise<HomePageData> {
	return getPage("/");
}
