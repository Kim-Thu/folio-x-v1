import { readFileSync, writeFileSync } from "node:fs";

const path = "public/admin/config.yml";
const config = readFileSync(path, "utf8");
const startMarker = "          - label: Related Labs\n            name: related\n            widget: object\n            fields:\n";
const nextMarker = "\n      - name: publication_catalog\n";
const start = config.indexOf(startMarker);
if (start < 0) throw new Error("Missing Related Labs Decap block");
const end = config.indexOf(nextMarker, start);
if (end < 0) throw new Error("Missing publication_catalog marker");

const relatedBlock = `          - label: Related Labs
            name: related
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - { label: Title, name: title, widget: string }
              - { label: Action label, name: actionLabel, widget: string }
              - { label: Action icon, name: actionIcon, widget: string }
              - { label: Metric icon, name: metricIcon, widget: string }
              - label: Settings
                name: settings
                widget: object
                fields:
                  - { label: Theme, name: theme, widget: select, options: [dark, light, canvas, accent, none] }
                  - { label: Spacing, name: spacing, widget: select, options: [compact, default, none, lead, body, closing] }
                  - { label: Container, name: container, widget: select, options: [fluid, wide, boxed, none] }
              - label: Stack
                name: stack
                widget: object
                fields:
                  - { label: Columns, name: columns, widget: hidden, default: one }
                  - { label: Gap, name: gap, widget: select, options: [none, xs, sm, md, lg, xl] }
              - label: Header presentation
                name: header
                widget: object
                fields:
                  - { label: Appearance, name: appearance, widget: select, options: [default, compact] }
                  - { label: Heading level, name: headingLevel, widget: number, value_type: int, min: 1, max: 6 }
`;

const repaired = `${config.slice(0, start)}${relatedBlock}${config.slice(end)}`;
writeFileSync(path, repaired, "utf8");

const verification = repaired.slice(start, start + relatedBlock.length);
for (const forbidden of ["name: card", "name: mediaRatio", "name: imageVariant", "name: copy", "name: metaRow", "name: surface", "name: metadataDisplay"]) {
  if (verification.includes(forbidden)) throw new Error(`Stale Related Labs Decap field remains: ${forbidden}`);
}
console.log("Related Labs Decap block repaired.");
