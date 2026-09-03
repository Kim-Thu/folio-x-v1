import { readFileSync, writeFileSync, rmSync } from "node:fs";

const configPath = "public/admin/config.yml";
const workflowPath = ".github/workflows/migrate-blog-cms-config.yml";
const scriptPath = ".github/scripts/migrate-blog-cms-config.mjs";

const config = readFileSync(configPath, "utf8");
const start = config.indexOf("\n  - name: blog\n");
const end = config.indexOf("\n  - name: comics\n", start);

if (start === -1 || end === -1) {
  throw new Error("Could not locate the Decap blog collection block");
}

const blogCollection = `
  - name: blog
    label: Blog
    label_singular: Blog post
    folder: src/content/blog
    create: true
    extension: md
    format: frontmatter
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
      - { label: Cover image, name: image, widget: image }
      - { label: Image alt, name: imageAlt, widget: string }
      - { label: Content, name: body, widget: markdown }
`;

writeFileSync(configPath, `${config.slice(0, start)}${blogCollection}${config.slice(end)}`);
rmSync(workflowPath, { force: true });
rmSync(scriptPath, { force: true });
