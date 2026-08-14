import fs from "node:fs";

const configPath = "public/admin/config.yml";
const config = fs.readFileSync(configPath, "utf8");

if (config.includes("          - name: blog_page\n")) {
  console.log("Blog page Decap editor already exists.");
  process.exit(0);
}

const marker = "\n      - name: publication_catalog\n";
if (!config.includes(marker)) {
  throw new Error("Could not find publication_catalog marker in Decap config.");
}

const block = `
          - name: blog_page
            label: Blog Page
            file: src/content/pages/blog.json
            format: json
            fields:
              - { label: Slug, name: slug, widget: string }
              - label: Meta
                name: meta
                widget: object
                fields:
                  - { label: Title, name: title, widget: string }
                  - { label: Description, name: description, widget: text, required: false }
                  - { label: Author, name: author, widget: string, required: false }
                  - { label: Published at, name: publishedAt, widget: string, required: false }
                  - { label: Updated at, name: updatedAt, widget: string, required: false }
              - label: Content
                name: content
                widget: object
                fields:
                  - label: Layout
                    name: layout
                    widget: object
                    fields:
                      - { label: Template, name: template, widget: select, options: [fluid, contained, boxed, sidebar, centered] }
                      - { label: Container size, name: containerSize, widget: select, required: false, options: [site, content] }
                      - { label: Aside label, name: asideLabel, widget: string, required: false }
                      - { label: Aside position, name: asidePosition, widget: select, required: false, options: [start, end] }
                  - label: Sections
                    name: sections
                    widget: list
                    summary: "{{fields.id}} — {{fields.type}}"
                    types:
                      - label: Blog page header
                        name: page_header
                        widget: object
                        fields:
                          - { label: ID, name: id, widget: string }
                          - { label: Type, name: type, widget: hidden, default: page-header }
                          - { label: Template, name: template, widget: select, options: [split-media, split-benefits, immersive] }
                          - label: Settings
                            name: settings
                            widget: object
                            fields: *section_settings
                          - label: Content
                            name: content
                            widget: object
                            fields:
                              - { label: Content ID, name: id, widget: string, required: false }
                              - { label: Eyebrow, name: eyebrow, widget: string, required: false }
                              - { label: Title, name: title, widget: string, required: false }
                              - { label: Accent, name: accent, widget: string, required: false }
                              - { label: Description, name: description, widget: text, required: false }
                              - label: Source
                                name: source
                                widget: object
                                required: false
                                fields:
                                  - { label: Collection, name: collection, widget: hidden, default: blog }
                              - label: Benefits
                                name: benefits
                                widget: object
                                required: false
                                fields:
                                  - { label: Article label, name: articleLabel, widget: string }
                                  - { label: Topic label, name: topicLabel, widget: string }
                                  - { label: Minute label, name: minuteLabel, widget: string }
                              - label: Image
                                name: image
                                widget: object
                                required: false
                                fields: *image_fields
                      - label: Blog archive
                        name: archive
                        widget: object
                        fields:
                          - { label: ID, name: id, widget: string }
                          - { label: Type, name: type, widget: hidden, default: archive }
                          - { label: Template, name: template, widget: hidden, default: faceted }
                          - label: Settings
                            name: settings
                            widget: object
                            fields: *section_settings
                          - label: Content
                            name: content
                            widget: object
                            fields:
                              - label: Source
                                name: source
                                widget: object
                                fields:
                                  - { label: Collection, name: collection, widget: hidden, default: blog }
                              - label: Toolbar
                                name: toolbar
                                widget: object
                                fields:
                                  - label: Search
                                    name: search
                                    widget: object
                                    fields:
                                      - { label: ID, name: id, widget: string }
                                      - { label: Label, name: label, widget: string }
                                      - { label: Name, name: name, widget: string }
                                      - { label: Placeholder, name: placeholder, widget: string }
                                  - label: Category
                                    name: category
                                    widget: object
                                    fields:
                                      - { label: Control, name: control, widget: string }
                                      - { label: ID, name: id, widget: string }
                                      - { label: Label, name: label, widget: string }
                                      - { label: All label, name: allLabel, widget: string }
                                      - { label: All value, name: allValue, widget: string }
                                  - label: Sort
                                    name: sort
                                    widget: object
                                    fields:
                                      - { label: Label, name: label, widget: string }
                                      - { label: Value, name: value, widget: string }
                                      - label: Options
                                        name: options
                                        widget: list
                                        fields:
                                          - { label: Label, name: label, widget: string }
                                          - { label: Value, name: value, widget: string }
                                  - label: View
                                    name: view
                                    widget: object
                                    fields:
                                      - { label: Label, name: label, widget: string }
                                      - { label: Grid label, name: gridLabel, widget: string }
                                      - { label: List label, name: listLabel, widget: string }
                              - label: Sidebar
                                name: sidebar
                                widget: object
                                fields:
                                  - { label: Navigation label, name: label, widget: string }
                                  - label: Filter
                                    name: filter
                                    widget: object
                                    fields:
                                      - { label: Appearance, name: appearance, widget: string }
                                      - { label: Control, name: control, widget: string }
                                      - { label: Legend, name: legend, widget: string }
                                      - { label: Name, name: name, widget: string }
                                      - { label: Type, name: type, widget: select, options: [radio, checkbox] }
                                      - { label: All label, name: allLabel, widget: string }
                                  - label: Featured articles
                                    name: featured
                                    widget: object
                                    fields:
                                      - { label: Title, name: title, widget: string }
                                      - { label: Limit, name: limit, widget: number, value_type: int, min: 1 }
                                      - label: Header presentation
                                        name: header
                                        widget: object
                                        fields:
                                          - { label: Appearance, name: appearance, widget: string }
                                          - { label: Heading level, name: headingLevel, widget: number, value_type: int, min: 1, max: 6 }
                                      - label: Cards
                                        name: cards
                                        widget: object
                                        fields:
                                          - { label: Template, name: template, widget: string }
                                          - { label: Layout, name: layout, widget: string }
                                          - { label: Columns, name: columns, widget: number, value_type: int, min: 1 }
                                          - { label: Gap, name: gap, widget: string }
                                          - { label: Media ratio, name: mediaRatio, widget: string, required: false }
                                          - { label: Separator, name: separator, widget: string, required: false }
                                          - { label: Heading level, name: headingLevel, widget: number, value_type: int, min: 1, max: 6, required: false }
                                          - label: Slots
                                            name: slots
                                            widget: object
                                            required: false
                                            fields:
                                              - { label: Media, name: media, widget: boolean, required: false }
                                              - { label: Excerpt, name: excerpt, widget: boolean, required: false }
                                              - { label: Metadata, name: metadata, widget: boolean, required: false }
                                              - { label: Tags, name: tags, widget: boolean, required: false }
                                              - { label: Metrics, name: metrics, widget: boolean, required: false }
                                              - { label: Action, name: action, widget: boolean, required: false }
                                  - label: Newsletter
                                    name: newsletter
                                    widget: object
                                    fields:
                                      - { label: Template, name: template, widget: select, options: [form-first, media-first] }
                                      - { label: Title, name: title, widget: string }
                                      - { label: Description, name: description, widget: text }
                                      - { label: Image, name: image, widget: object, fields: *image_fields }
                                      - { label: Action, name: action, widget: object, fields: *action_fields }
                                      - label: Form
                                        name: form
                                        widget: object
                                        fields:
                                          - { label: Form name, name: formName, widget: string }
                                          - { label: Input ID, name: inputId, widget: string }
                                          - { label: Input label, name: inputLabel, widget: string }
                                          - { label: Placeholder, name: placeholder, widget: string }
                                          - { label: Submit label, name: submitLabel, widget: string }
                                          - { label: Tone, name: tone, widget: select, required: false, options: [dark, light] }
                              - label: Item presentation
                                name: itemPresentation
                                widget: object
                                fields:
                                  - label: Routes
                                    name: routes
                                    widget: object
                                    fields:
                                      - { label: Base, name: base, widget: string }
                                      - { label: Category base, name: categoryBase, widget: string }
                                      - { label: Tag base, name: tagBase, widget: string }
                                  - { label: Separator, name: separator, widget: string }
                                  - { label: Metadata display, name: metadataDisplay, widget: string }
                                  - { label: Tags label suffix, name: tagsLabelSuffix, widget: string }
                                  - { label: Image width, name: imageWidth, widget: number, value_type: int, min: 1 }
                                  - { label: Image height, name: imageHeight, widget: number, value_type: int, min: 1 }
                              - label: Result
                                name: result
                                widget: object
                                fields:
                                  - { label: Title, name: title, widget: string }
                                  - label: Header presentation
                                    name: header
                                    widget: object
                                    fields:
                                      - { label: Appearance, name: appearance, widget: string }
                                      - { label: Heading level, name: headingLevel, widget: number, value_type: int, min: 1, max: 6 }
                              - label: Cards
                                name: cards
                                widget: object
                                fields:
                                  - { label: Template, name: template, widget: string }
                                  - { label: Layout, name: layout, widget: string }
                                  - { label: Columns, name: columns, widget: number, value_type: int, min: 1 }
                                  - { label: Gap, name: gap, widget: string }
                                  - { label: Media ratio, name: mediaRatio, widget: string, required: false }
                                  - { label: Separator, name: separator, widget: string, required: false }
                                  - { label: Heading level, name: headingLevel, widget: number, value_type: int, min: 1, max: 6, required: false }
                                  - label: Slots
                                    name: slots
                                    widget: object
                                    required: false
                                    fields:
                                      - { label: Media, name: media, widget: boolean, required: false }
                                      - { label: Excerpt, name: excerpt, widget: boolean, required: false }
                                      - { label: Metadata, name: metadata, widget: boolean, required: false }
                                      - { label: Tags, name: tags, widget: boolean, required: false }
                                      - { label: Metrics, name: metrics, widget: boolean, required: false }
                                      - { label: Action, name: action, widget: boolean, required: false }
                              - { label: Empty label, name: emptyLabel, widget: string }
                              - label: Pagination
                                name: pagination
                                widget: object
                                fields:
                                  - { label: Label, name: label, widget: string }
                                  - { label: Previous label, name: previousLabel, widget: string }
                                  - { label: Next label, name: nextLabel, widget: string }
                                  - { label: Page size, name: pageSize, widget: number, value_type: int, min: 1 }
                      - label: Blog subscription CTA
                        name: cta
                        widget: object
                        fields:
                          - { label: ID, name: id, widget: string }
                          - { label: Type, name: type, widget: hidden, default: cta }
                          - { label: Template, name: template, widget: select, options: [callout, default, media-pricing, subscription] }
                          - label: Settings
                            name: settings
                            widget: object
                            fields: *section_settings
                          - label: Content
                            name: content
                            widget: object
                            fields:
                              - { label: Content ID, name: id, widget: string, required: false }
                              - { label: Title, name: title, widget: string }
                              - { label: Description, name: description, widget: text, required: false }
                              - { label: Action, name: action, widget: object, required: false, fields: *action_fields }
                              - { label: Image, name: image, widget: object, required: false, fields: *image_fields }
                              - label: Form
                                name: form
                                widget: object
                                required: false
                                fields:
                                  - { label: Form name, name: formName, widget: string }
                                  - { label: Input ID, name: inputId, widget: string }
                                  - { label: Input label, name: inputLabel, widget: string }
                                  - { label: Placeholder, name: placeholder, widget: string }
                                  - { label: Submit label, name: submitLabel, widget: string }
                                  - { label: Tone, name: tone, widget: select, required: false, options: [dark, light] }
`;

fs.writeFileSync(configPath, config.replace(marker, `${block}${marker}`));
console.log("Added full Blog page Decap editor.");
