import { readFile, writeFile } from "node:fs/promises";

const path = "src/content/schemas.ts";
let source = await readFile(path, "utf8");

const findDeclarationEnd = (start) => {
  const pairs = { "(": ")", "[": "]", "{": "}" };
  const closing = new Set(Object.values(pairs));
  const stack = [];
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (pairs[char]) {
      stack.push(pairs[char]);
      continue;
    }

    if (closing.has(char)) {
      if (stack.pop() !== char) throw new Error("Unbalanced schema declaration");
      continue;
    }

    if (char === ";" && stack.length === 0) return index + 1;
  }

  throw new Error("Could not find declaration end");
};

const declarationRange = (prefix) => {
  const start = source.indexOf(prefix);
  if (start === -1) throw new Error(`Missing schema declaration: ${prefix}`);
  return [start, findDeclarationEnd(start)];
};

const replaceDeclaration = (prefix, next) => {
  const [start, end] = declarationRange(prefix);
  source = `${source.slice(0, start)}${next}${source.slice(end)}`;
};

const removeDeclaration = (prefix) => {
  const [start, end] = declarationRange(prefix);
  let nextEnd = end;
  while (source[nextEnd] === "\n") nextEnd += 1;
  source = `${source.slice(0, start)}${source.slice(nextEnd)}`;
};

replaceDeclaration(
  "const heroSectionSchema =",
  'const heroSectionSchema = z.object({ id: z.string().min(1), type: z.literal("hero"), template: z.literal("split-media"), settings: pageSectionSettingsSchema, content: z.object({ id: z.string().optional(), eyebrow: z.string().optional(), title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]), accent: z.string().optional(), description: z.string().optional(), image: imageSchema.optional(), actions: z.array(pageActionSchema).optional(), actionsLabel: z.string().optional(), socialLinks: z.array(socialLinkSchema).optional(), scrollLabel: z.string().optional() }) });'
);
replaceDeclaration(
  "const pageHeaderSectionSchema =",
  'const pageHeaderSectionSchema = z.object({ id: z.string().min(1), type: z.literal("page-header"), template: z.enum(["split-media", "split-benefits", "immersive"]), settings: pageSectionSettingsSchema, content: z.object({ id: z.string().optional(), title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]).optional(), description: z.string().optional(), eyebrow: z.string().optional(), accent: z.string().optional(), image: imageSchema.optional(), source: z.object({ collection: z.literal("blog") }).optional(), breadcrumb: z.object({ label: z.string().min(1), items: z.array(navigationItemSchema), current: z.string().min(1) }).optional(), benefits: z.union([z.object({ items: z.array(z.object({ label: z.string().min(1), icon: z.string().min(1) })).min(1) }), z.object({ articleLabel: z.string().min(1), topicLabel: z.string().min(1), minuteLabel: z.string().min(1) })]).optional(), actionsLabel: z.string().optional(), actions: z.array(pageActionSchema).optional(), quote: z.string().optional(), quoteCredit: z.string().optional(), metrics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1), icon: z.string().min(1) })).optional() }) });'
);
replaceDeclaration(
  "const articleSectionSchema =",
  'const articleSectionSchema = z.object({ id: z.string().min(1), type: z.literal("article"), template: z.string().optional(), settings: pageSectionSettingsSchema, content: z.object({ blocks: z.array(z.object({ id: z.string().min(1), title: z.string().min(1), paragraphs: z.array(z.string().min(1)).min(1) })).min(1) }) });'
);
replaceDeclaration(
  "const ctaSectionSchema =",
  'const ctaSectionSchema = z.object({ id: z.string().min(1), type: z.literal("cta"), template: z.enum(["callout", "default", "media-pricing", "subscription"]), settings: pageSectionSettingsSchema, content: z.object({ id: z.string().optional(), title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]), description: z.string().optional(), action: pageActionSchema.optional(), image: imageSchema.optional(), features: z.object({ items: z.array(z.object({ label: z.string().min(1), icon: z.string().min(1) })).min(1) }).optional(), price: z.object({ current: z.string().min(1), period: z.string().optional(), previous: z.string().optional() }).optional(), form: z.object({ formName: z.string().min(1), inputId: z.string().min(1), inputLabel: z.string().min(1), placeholder: z.string().min(1), submitLabel: z.string().min(1), tone: z.enum(["dark", "light"]).optional() }).optional() }) });'
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
]) removeDeclaration(prefix);

if (source.includes(".passthrough()")) throw new Error("passthrough() remains in shared schema");
for (const legacy of ["labDetailPageSchema", "publicationDetailPageSchema", "entryDetailPageSchema", "readerPageSchema"]) {
  if (source.includes(legacy)) throw new Error(`Legacy detail schema reference remains: ${legacy}`);
}

await writeFile(path, `${source.trimEnd()}\n`, "utf8");
console.log("Cleaned shared schemas and removed legacy detail contracts");
