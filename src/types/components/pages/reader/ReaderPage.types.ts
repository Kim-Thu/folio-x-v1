import type { PublicationEntry } from "@/types/content";

export interface ReaderPageData {
	entry: PublicationEntry;
	catalogSlug: "comics" | "novels";
	chapter: number;
}

export interface ReaderPageProps {
	data: ReaderPageData;
}
