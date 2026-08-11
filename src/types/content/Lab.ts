import type { labEntrySchema } from "@/content/schemas";
import type { z } from "astro/zod";

type LabEntry = z.infer<typeof labEntrySchema>;

export type Lab = LabEntry & {
	href: string;
};

export type LabImage = LabEntry["image"];
