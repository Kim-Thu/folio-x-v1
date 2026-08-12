import type { labEntrySchema } from "@/content/lab-schema";
import type { z } from "astro/zod";

type LabEntry = z.infer<typeof labEntrySchema>;

export type Lab = LabEntry & {
	href: string;
};

export type LabImage = LabEntry["image"];
export type LabContentBlock = LabEntry["content"][number];
