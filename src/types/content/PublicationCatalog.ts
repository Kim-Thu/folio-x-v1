import type { publicationEntrySchema } from "@/content/publication-schema";
import type { z } from "astro/zod";

export type PublicationCollection = "comics" | "novels";
export type PublicationEntry = z.infer<typeof publicationEntrySchema>;
export type PublicationChapterContent = PublicationEntry["detail"]["reader"] extends Array<infer Chapter>
	? Chapter
	: never;
