import type { productEntrySchema } from "@/content/schemas";
import type { z } from "astro/zod";

export type Product = z.infer<typeof productEntrySchema>;
