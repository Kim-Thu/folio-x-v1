import type { projectEntrySchema } from "@/content/project-schema";
import type { z } from "astro/zod";

type ProjectEntry = z.infer<typeof projectEntrySchema>;

export type Project = ProjectEntry & {
	number: string;
	href: string;
};
