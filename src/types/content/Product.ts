import type { productEntrySchema } from "@/content/schemas";
import type { z } from "astro/zod";

type ProductEntry = z.infer<typeof productEntrySchema>;

export type Product = ProductEntry & {
	href: string;
};
