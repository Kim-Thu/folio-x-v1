import { readFile, writeFile } from "node:fs/promises";

const path = "public/admin/config.yml";
let config = await readFile(path, "utf8");

if (config.includes("folder: src/content/blog")) {
  console.log("Decap Blog collection is already canonical");
  process.exit(0);
}

const marker = "\n\n  - name: comics\n";
if (!config.includes(marker)) {
  throw new Error("Cannot locate Comics collection insertion point");
}

const blogCollection = `

  - name: blog
    label: Blog
    label_singular: Blog post
    folder: src/content/blog
    create: true
    extension: json
    format: json
    slug: "{{slug}}"
    identifier_field: slug
    summary: "{{title}} — {{category}}"
    fields:
      - { label: Order, name: order, widget: number, value_type: int, min: 1 }
      - { label: Reading minutes, name: readingMinutes, widget: number, value_type: int, min: 1 }
      - { label: Slug, name: slug, widget: string }
      - { label: Category, name: category, widget: string }
      - { label: Category slug, name: categorySlug, widget: string }
      - label: Tags
        name: tags
        widget: list
        fields: *taxonomy_term_fields
      - { label: Title, name: title, widget: string }
      - { label: Excerpt, name: excerpt, widget: text }
      - { label: Published at, name: publishedAt, widget: datetime, date_format: YYYY-MM-DD, time_format: false, format: YYYY-MM-DD }
      - { label: Author, name: author, widget: string }
      - { label: Image URL, name: image, widget: string }
      - { label: Image alt, name: imageAlt, widget: string }
      - label: Content
        name: content
        widget: list
        summary: "{{fields.type}} — {{fields.text}}"
        types:
          - label: Heading
            name: heading
            widget: object
            fields:
              - { label: Type, name: type, widget: hidden, default: heading }
              - { label: ID, name: id, widget: string }
              - { label: Level, name: level, widget: select, options: [2, 3] }
              - { label: Text, name: text, widget: string }
          - label: Paragraph
            name: paragraph
            widget: object
            fields:
              - { label: Type, name: type, widget: hidden, default: paragraph }
              - { label: Text, name: text, widget: text }
          - label: Image
            name: image
            widget: object
            fields:
              - { label: Type, name: type, widget: hidden, default: image }
              - label: Image
                name: image
                widget: object
                fields: *image_fields
`;

config = config.replace(marker, `${blogCollection}${marker}`);
await writeFile(path, config, "utf8");
console.log("Added canonical Decap Blog collection");
