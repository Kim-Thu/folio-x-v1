import { readFile, writeFile } from "node:fs/promises";

const path = "public/admin/config.yml";
let source = await readFile(path, "utf8");

if (source.includes("      - name: publication_catalog\n")) {
  console.log("Publication catalog Decap editor already exists");
  process.exit(0);
}

const marker = "      - name: interface\n";
if (!source.includes(marker)) {
  throw new Error("Could not find Decap settings insertion point");
}

const block = `      - name: publication_catalog
        label: Giao diện Comics / Novels
        file: src/content/globals/publication-catalog.json
        format: json
        fields:
          - label: Toolbar
            name: toolbar
            widget: object
            fields:
              - { label: Search label, name: searchLabel, widget: string }
              - { label: Search placeholder, name: searchPlaceholder, widget: string }
              - { label: Genre label, name: genreLabel, widget: string }
              - { label: All genres label, name: allGenresLabel, widget: string }
              - { label: Status label, name: statusLabel, widget: string }
              - { label: All statuses label, name: allStatusesLabel, widget: string }
              - { label: Ongoing label, name: ongoingLabel, widget: string }
              - { label: Complete label, name: completeLabel, widget: string }
              - { label: Sort label, name: sortLabel, widget: string }
              - { label: Sort value, name: sortValue, widget: string }
              - label: Sort options
                name: sortOptions
                widget: list
                fields: &publication_catalog_options
                  - { label: Label, name: label, widget: string }
                  - { label: Value, name: value, widget: string }
              - { label: View label, name: viewLabel, widget: string }
              - { label: Grid view label, name: gridViewLabel, widget: string }
              - { label: List view label, name: listViewLabel, widget: string }
          - label: Sidebar
            name: sidebar
            widget: object
            fields:
              - { label: Navigation label template, name: labelTemplate, widget: string, hint: "Use {catalog} as the collection placeholder" }
              - { label: Position, name: position, widget: select, options: [start, end] }
              - { label: Sticky, name: sticky, widget: boolean }
              - { label: Genres legend, name: genresLegend, widget: string }
              - { label: All genres short label, name: allGenresShortLabel, widget: string }
              - label: Panel
                name: panel
                widget: object
                fields:
                  - { label: Surface, name: surface, widget: string }
                  - { label: Radius, name: radius, widget: string }
                  - { label: Spacing, name: spacing, widget: string }
              - { label: Trending title, name: trendingTitle, widget: string }
              - { label: Popular authors title, name: popularAuthorsTitle, widget: string }
              - label: List card presentation
                name: listCards
                widget: object
                fields: &publication_catalog_card_fields
                  - { label: Template, name: template, widget: string }
                  - { label: Layout, name: layout, widget: select, options: [grid, list] }
                  - { label: Columns, name: columns, widget: number, value_type: int, min: 1 }
                  - { label: Gap, name: gap, widget: string }
                  - { label: Media ratio, name: mediaRatio, widget: string, required: false }
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
              - label: Author placeholder
                name: authorPlaceholder
                widget: object
                fields:
                  - { label: Image, name: src, widget: image }
                  - { label: Width, name: width, widget: number, value_type: int, min: 1 }
                  - { label: Height, name: height, widget: number, value_type: int, min: 1 }
              - { label: Trending limit, name: trendingLimit, widget: number, value_type: int, min: 1 }
              - { label: Author limit, name: authorLimit, widget: number, value_type: int, min: 1 }
          - label: Main content
            name: main
            widget: object
            fields:
              - { label: Featured title, name: featuredTitle, widget: string }
              - { label: Latest title, name: latestTitle, widget: string }
              - { label: Popular genres title, name: popularGenresTitle, widget: string }
              - { label: Featured limit, name: featuredLimit, widget: number, value_type: int, min: 1 }
              - { label: Latest limit, name: latestLimit, widget: number, value_type: int, min: 1 }
              - { label: Popular genres limit, name: popularGenresLimit, widget: number, value_type: int, min: 1 }
              - { label: Featured cards, name: featuredCards, widget: object, fields: *publication_catalog_card_fields }
              - { label: Latest cards, name: latestCards, widget: object, fields: *publication_catalog_card_fields }
              - { label: Genre cards, name: genreCards, widget: object, fields: *publication_catalog_card_fields }
              - label: Genre icons
                name: genreIcons
                widget: list
                field: { label: Icon, name: icon, widget: string }
              - { label: Genre works template, name: genreWorksTemplate, widget: string, hint: "Use {count} as the number placeholder" }
              - { label: Author works template, name: authorWorksTemplate, widget: string, hint: "Use {count} as the number placeholder" }

`;

source = source.replace(marker, `${block}${marker}`);
await writeFile(path, source, "utf8");
console.log("Added publication catalog Decap editor");
