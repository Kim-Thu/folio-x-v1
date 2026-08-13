import { readFile, writeFile } from "node:fs/promises";

const path = "src/content/schemas.ts";
let source = await readFile(path, "utf8");

const replaceLine = (prefix, next) => {
  const lines = source.split("\n");
  const index = lines.findIndex((line) => line.startsWith(prefix));
  if (index === -1) throw new Error(`Missing schema line: ${prefix}`);
  lines[index] = next;
  source = lines.join("\n");
};

const removeLine = (prefix) => {
  const lines = source.split("\n");
  const before = lines.length;
  const next = lines.filter((line) => !line.startsWith(prefix));
  if (next.length === before) throw new Error(`Missing removable line: ${prefix}`);
  source = next.join("\n");
};

replaceLine(
  "const heroSectionSchema =",
  'const heroSectionSchema = z.object({ id: z.string().min(1), type: z.literal("hero"), template: z.literal("split-media"), settings: pageSectionSettingsSchema, content: z.object({ id: z.string().optional(), eyebrow: z.string().optional(), title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]), accent: z.string().optional(), description: z.string().optional(), image: imageSchema.optional(), actions: z.array(pageActionSchema).optional(), actionsLabel: z.string().optional(), socialLinks: z.array(socialLinkSchema).optional(), scrollLabel: z.string().optional() }) });'
);
replaceLine(
  "const pageHeaderSectionSchema =",
  'const pageHeaderSectionSchema = z.object({ id: z.string().min(1), type: z.literal("page-header"), template: z.enum(["split-media", "split-benefits"]), settings: pageSectionSettingsSchema, content: z.object({ id: z.string().optional(), title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]).optional(), description: z.string().optional(), eyebrow: z.string().optional(), accent: z.string().optional(), image: imageSchema.optional(), breadcrumb: z.object({ label: z.string().min(1), items: z.array(navigationItemSchema), current: z.string().min(1) }).optional(), benefits: z.object({ items: z.array(z.object({ label: z.string().min(1), icon: z.string().min(1) })).min(1) }).optional() }) });'
);
replaceLine(
  "const articleSectionSchema =",
  'const articleSectionSchema = z.object({ id: z.string().min(1), type: z.literal("article"), template: z.string().optional(), settings: pageSectionSettingsSchema, content: z.object({ blocks: z.array(z.object({ id: z.string().min(1), title: z.string().min(1), paragraphs: z.array(z.string().min(1)).min(1) })).min(1) }) });'
);
replaceLine(
  "const ctaSectionSchema =",
  'const ctaSectionSchema = z.object({ id: z.string().min(1), type: z.literal("cta"), template: z.enum(["callout", "default", "media-pricing"]), settings: pageSectionSettingsSchema, content: z.object({ id: z.string().optional(), title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]), description: z.string().optional(), action: pageActionSchema.optional(), image: imageSchema.optional(), features: z.object({ items: z.array(z.object({ label: z.string().min(1), icon: z.string().min(1) })).min(1) }).optional(), price: z.object({ current: z.string().min(1), period: z.string().optional(), previous: z.string().optional() }).optional() }) });'
);

for (const prefix of [
  "const taxonomyTermSchema =",
  "const contentSectionSchema =",
  "const insightContentNodeSchema =",
  "const buttonActionSchema =",
  "const cardTemplateSchema =",
  "const cardLayoutSchema =",
  "const cardColumnsSchema =",
  "const cardGapSchema =",
  "const columnsSchema =",
  "const layoutGapSchema =",
  "const headingAppearanceSchema =",
  "const actionVariantSchema =",
  "const metricSourceSchema =",
  "const labDetailPageSchema =",
  "const publicationDetailPageSchema =",
  "const entryDetailPageSchema =",
  "const readerPageSchema =",
  "export const blogEntrySchema =",
  "export const labEntrySchema =",
  "export const publicationEntrySchema =",
  "export const projectEntrySchema =",
]) removeLine(prefix);

if (source.includes(".passthrough()")) {
  throw new Error("passthrough() remains in shared schema");
}
if (source.includes("labDetailPageSchema") || source.includes("publicationDetailPageSchema") || source.includes("entryDetailPageSchema") || source.includes("readerPageSchema")) {
  throw new Error("Legacy detail schema reference remains");
}

await writeFile(path, `${source.trimEnd()}\n`, "utf8");
console.log("Cleaned shared schemas and removed legacy detail contracts");
