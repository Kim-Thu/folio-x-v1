import { readFileSync, writeFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const write = (path, content) => writeFileSync(path, content, "utf8");

const cardPath = "src/components/object/project/card/templates/CardMediaCaption.astro";
write(
  cardPath,
  `---
import CBox from "@/components/object/component/CBox.astro";
import CColumns from "@/components/object/component/CColumns.astro";
import CFeature from "@/components/object/component/CFeature.astro";
import CHeading from "@/components/object/component/CHeading.astro";
import CImage from "@/components/object/component/CImage.astro";
import CLink from "@/components/object/component/CLink.astro";
import CMedia from "@/components/object/component/CMedia.astro";
import CMetadata from "@/components/object/component/CMetadata.astro";
import CRow from "@/components/object/component/CRow.astro";
import CText from "@/components/object/component/CText.astro";
import type { PCardItemProps } from "@/types/components/object/project/card/PCard.types";

const {
\tdata,
\theadingLevel = 3,
\tmediaRatio = "editorial",
\tslots,
} = Astro.props as PCardItemProps;
---

<CBox
\tas="article"
\tsurface="bordered"
\tradius="md"
\toverflow="hidden"
\tclass="h-full transition-transform duration-300 hover:-translate-y-1"
>
\t{slots.media && data.media && (
\t\t<CMedia ratio={mediaRatio} href={data.href} ariaLabel={data.ariaLabel} shape="none">
\t\t\t<CImage {...data.media} variant="fill" />
\t\t</CMedia>
\t)}

\t<CBox spacing="xs" class="border-t border-black/10">
\t\t<CColumns columns="one" gap="sm">
\t\t\t{((slots.metadata && data.metadata) || (slots.metrics && data.metrics && data.metrics.length > 0)) && (
\t\t\t\t<CRow justify="between" align="center" gap="sm">
\t\t\t\t\t{slots.metadata && data.metadata && (
\t\t\t\t\t\t<CMetadata data={data.metadata} tone="brand" slots={{ icons: false }} />
\t\t\t\t\t)}
\t\t\t\t\t{slots.metrics && data.metrics && data.metrics.map((metric) => (
\t\t\t\t\t\t<CFeature {...metric} appearance="caption" />
\t\t\t\t\t))}
\t\t\t\t</CRow>
\t\t\t)}

\t\t\t{slots.title && (
\t\t\t\t<CHeading level={headingLevel} variant="h5">
\t\t\t\t\t<CLink href={data.href}>{data.title.join(" ")}</CLink>
\t\t\t\t</CHeading>
\t\t\t)}

\t\t\t{slots.excerpt && data.excerpt && (
\t\t\t\t<CText variant="body-sm" tone="muted">{data.excerpt}</CText>
\t\t\t)}
\t\t</CColumns>
\t</CBox>
</CBox>
`,
);

const resolverPath = "src/data/pages/getLabDetailPageData.ts";
let resolver = read(resolverPath);
const resolverReplacements = [
  ['template: "editorial" as const,', 'template: "media-caption" as const,'],
  ["\n\t\t\t\t\t\t\t\tmediaRatio: presentation.related.mediaRatio,", ""],
  ["\n\t\t\t\t\t\t\t\t\t\t\t\tdisplay: presentation.related.metaRow.metadataDisplay,", ""],
];
for (const [from, to] of resolverReplacements) {
  if (!resolver.includes(from)) throw new Error(`Missing resolver fragment: ${from}`);
  resolver = resolver.replace(from, to);
}
write(resolverPath, resolver);

const jsonPath = "src/content/globals/lab-detail.json";
const json = JSON.parse(read(jsonPath));
const related = json.related;
if (!related || typeof related !== "object") throw new Error("Missing related settings");
for (const key of ["card", "mediaRatio", "imageVariant", "copy", "metaRow"]) {
  if (!(key in related)) throw new Error(`Missing related.${key}`);
  delete related[key];
}
write(jsonPath, `${JSON.stringify(json, null, 2)}\n`);

const schemaPath = "src/content/lab-detail-settings-schema.ts";
let schema = read(schemaPath);
schema = schema.replace(
  /const copySchema = z\.object\(\{[\s\S]*?\n\}\);\n\n/,
  "",
);
const relatedStart = schema.indexOf("  related: z.object({");
if (relatedStart < 0) throw new Error("Missing related schema");
const relatedEnd = schema.indexOf("  }),\n});", relatedStart);
if (relatedEnd < 0) throw new Error("Missing related schema end");
const relatedBlock = schema.slice(relatedStart, relatedEnd + 5);
const headerMarker = "    header: sectionHeaderSchema,";
const headerIndex = relatedBlock.indexOf(headerMarker);
if (headerIndex < 0) throw new Error("Missing related header schema");
const normalizedRelated = `${relatedBlock.slice(0, headerIndex)}${headerMarker}\n  })`;
schema = `${schema.slice(0, relatedStart)}${normalizedRelated}${schema.slice(relatedEnd + 5)}`;
write(schemaPath, schema);

const configPath = "public/admin/config.yml";
let config = read(configPath);
const startMarker = "          - label: Related Labs\n            name: related\n            widget: object\n            fields:\n";
const nextMarker = "\n      - name: publication_catalog\n";
const start = config.indexOf(startMarker);
if (start < 0) throw new Error("Missing Related Labs Decap block");
const end = config.indexOf(nextMarker, start);
if (end < 0) throw new Error("Missing publication_catalog marker");
let block = config.slice(start, end);
for (const line of [
  "              - { label: Media ratio, name: mediaRatio, widget: hidden, default: editorial }\n",
  "              - { label: Image variant, name: imageVariant, widget: hidden, default: fill }\n",
]) {
  if (!block.includes(line)) throw new Error(`Missing Decap line: ${line.trim()}`);
  block = block.replace(line, "");
}
const removeObject = (text, label) => {
  const marker = `              - label: ${label}\n`;
  const blockStart = text.indexOf(marker);
  if (blockStart < 0) throw new Error(`Missing Decap block: ${label}`);
  const next = text.indexOf("              - ", blockStart + marker.length);
  return next < 0 ? text.slice(0, blockStart) : text.slice(0, blockStart) + text.slice(next);
};
for (const label of ["Card", "Copy", "Metadata row"]) block = removeObject(block, label);
config = `${config.slice(0, start)}${block}${config.slice(end)}`;
write(configPath, config);

console.log("Related Labs card contract normalized.");
