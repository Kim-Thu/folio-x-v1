import fs from "node:fs";

const configPath = "public/admin/config.yml";
const config = fs.readFileSync(configPath, "utf8");

if (config.includes("      - name: lab_detail\n")) {
  console.log("Lab Detail Decap editor already exists.");
  process.exit(0);
}

const marker = "\n      - name: publication_catalog\n";
if (!config.includes(marker)) {
  throw new Error("Could not find publication_catalog marker in Decap config.");
}

const block = `
      - name: lab_detail
        label: Giao diện Lab Detail
        file: src/content/globals/lab-detail.json
        format: json
        fields:
          - label: Page
            name: page
            widget: object
            fields:
              - { label: Template, name: template, widget: select, options: [fluid, contained, boxed, sidebar, centered] }

          - label: Header
            name: header
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - { label: Template, name: template, widget: hidden, default: media-aside }
              - label: Settings
                name: settings
                widget: object
                fields:
                  - { label: Theme, name: theme, widget: select, options: [dark, light, canvas, accent, none] }
                  - { label: Spacing, name: spacing, widget: select, options: [compact, default, none, lead, body, closing] }
                  - { label: Container, name: container, widget: select, options: [site, content, none] }
              - label: Labels
                name: labels
                widget: object
                fields:
                  - { label: Breadcrumb, name: breadcrumb, widget: string }
                  - { label: Collection, name: collection, widget: string }
                  - { label: Actions template, name: actionsTemplate, widget: string }
                  - { label: Live demo, name: live, widget: string }
                  - { label: Source code, name: source, widget: string }
              - label: Routes
                name: routes
                widget: object
                fields:
                  - { label: Base, name: base, widget: string }
                  - { label: Category base, name: categoryBase, widget: string }
                  - { label: Technology base, name: technologyBase, widget: string }
              - label: Metrics
                name: metrics
                widget: list
                fields:
                  - { label: Icon, name: icon, widget: string }
                  - { label: Source, name: source, widget: select, options: [stars, forks, updatedLabel] }
              - label: Actions
                name: actions
                widget: object
                fields:
                  - label: Live
                    name: live
                    widget: object
                    fields:
                      - { label: Icon, name: icon, widget: string }
                      - { label: Variant, name: variant, widget: select, options: [primary, outline] }
                  - label: Source
                    name: source
                    widget: object
                    fields:
                      - { label: Icon, name: icon, widget: string }
                      - { label: Variant, name: variant, widget: select, options: [primary, outline] }

          - label: Navigation
            name: navigation
            widget: object
            fields:
              - { label: Label template, name: labelTemplate, widget: string }
              - label: Settings
                name: settings
                widget: object
                fields:
                  - { label: Theme, name: theme, widget: select, options: [dark, light, canvas, accent, none] }
                  - { label: Spacing, name: spacing, widget: select, options: [compact, default, none, lead, body, closing] }
                  - { label: Container, name: container, widget: select, options: [site, content, none] }
              - { label: Appearance, name: appearance, widget: hidden, default: underline }
              - { label: Tone, name: tone, widget: hidden, default: light }
              - { label: Frame class, name: frameClass, widget: string }

          - label: Content
            name: content
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - label: Settings
                name: settings
                widget: object
                fields:
                  - { label: Theme, name: theme, widget: select, options: [dark, light, canvas, accent, none] }
                  - { label: Spacing, name: spacing, widget: select, options: [compact, default, none, lead, body, closing] }
                  - { label: Container, name: container, widget: select, options: [site, content, none] }
              - label: Article
                name: article
                widget: object
                fields:
                  - { label: Template, name: template, widget: hidden, default: flow }
                  - { label: Frame class, name: frameClass, widget: string }

          - label: Sidebar
            name: sidebar
            widget: object
            fields:
              - { label: Label template, name: labelTemplate, widget: string }
              - { label: Position, name: position, widget: select, options: [start, end] }
              - { label: Sticky, name: sticky, widget: boolean }
              - label: Stack
                name: stack
                widget: object
                fields:
                  - { label: Columns, name: columns, widget: hidden, default: one }
                  - { label: Gap, name: gap, widget: select, options: [none, xs, sm, md, lg, xl] }
              - label: Panel
                name: panel
                widget: object
                fields:
                  - { label: Surface, name: surface, widget: select, options: [plain, accent, bordered, canvas, dark, glass, glass-dark, soft] }
                  - { label: Radius, name: radius, widget: select, options: [none, md, lg] }
                  - { label: Spacing, name: spacing, widget: select, options: [none, xs, sm, md, lg, xl] }
                  - label: Stack
                    name: stack
                    widget: object
                    fields:
                      - { label: Columns, name: columns, widget: hidden, default: one }
                      - { label: Gap, name: gap, widget: select, options: [none, xs, sm, md, lg, xl] }
                  - { label: Divider class, name: dividerClass, widget: string }
              - label: Labels
                name: labels
                widget: object
                fields:
                  - { label: Project information, name: projectInformation, widget: string }
                  - { label: Technology template, name: technologyTemplate, widget: string }
              - label: Header presentation
                name: header
                widget: object
                fields:
                  - { label: Appearance, name: appearance, widget: select, options: [default, compact] }
                  - { label: Heading level, name: headingLevel, widget: number, value_type: int, min: 1, max: 6 }

          - label: Gallery
            name: gallery
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - { label: Title, name: title, widget: string }
              - { label: Open image label template, name: openImageLabelTemplate, widget: string }
              - { label: Image title label template, name: imageTitleLabelTemplate, widget: string }
              - label: Settings
                name: settings
                widget: object
                fields:
                  - { label: Theme, name: theme, widget: select, options: [dark, light, canvas, accent, none] }
                  - { label: Spacing, name: spacing, widget: select, options: [compact, default, none, lead, body, closing] }
                  - { label: Container, name: container, widget: select, options: [site, content, none] }
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
              - { label: Grid class, name: gridClass, widget: string }
              - { label: Link class, name: linkClass, widget: string }
              - { label: Media ratio, name: mediaRatio, widget: hidden, default: editorial }
              - { label: Image variant, name: imageVariant, widget: hidden, default: fill }
              - { label: Image class, name: imageClass, widget: string }
              - { label: Caption class, name: captionClass, widget: string }
              - { label: Caption variant, name: captionVariant, widget: hidden, default: caption }
              - { label: Caption tone, name: captionTone, widget: hidden, default: muted }

          - label: Resources
            name: resources
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - { label: Title, name: title, widget: string }
              - { label: Action icon, name: actionIcon, widget: string }
              - { label: Resource icon size, name: iconSize, widget: select, options: [xs, sm, md, lg, xl] }
              - label: Settings
                name: settings
                widget: object
                fields:
                  - { label: Theme, name: theme, widget: select, options: [dark, light, canvas, accent, none] }
                  - { label: Spacing, name: spacing, widget: select, options: [compact, default, none, lead, body, closing] }
                  - { label: Container, name: container, widget: select, options: [site, content, none] }
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
              - { label: Grid class, name: gridClass, widget: string }
              - label: Card
                name: card
                widget: object
                fields:
                  - { label: Surface, name: surface, widget: hidden, default: bordered }
                  - { label: Radius, name: radius, widget: hidden, default: md }
                  - { label: Spacing, name: spacing, widget: hidden, default: md }
                  - label: Stack
                    name: stack
                    widget: object
                    fields:
                      - { label: Columns, name: columns, widget: hidden, default: one }
                      - { label: Gap, name: gap, widget: select, options: [none, xs, sm, md, lg, xl] }
              - label: Row
                name: row
                widget: object
                fields:
                  - { label: Align, name: align, widget: hidden, default: center }
                  - { label: Justify, name: justify, widget: hidden, default: between }
                  - { label: Gap, name: gap, widget: hidden, default: md }
              - { label: Icon class, name: iconClass, widget: string }
              - label: Action presentation
                name: action
                widget: object
                fields:
                  - { label: Size, name: size, widget: hidden, default: xs }
                  - { label: Variant, name: variant, widget: hidden, default: outline }
                  - { label: Tone, name: tone, widget: hidden, default: light }
                  - { label: Icon only, name: iconOnly, widget: boolean }
              - label: Copy
                name: copy
                widget: object
                fields:
                  - label: Stack
                    name: stack
                    widget: object
                    fields:
                      - { label: Columns, name: columns, widget: hidden, default: one }
                      - { label: Gap, name: gap, widget: select, options: [none, xs, sm, md, lg, xl] }
                  - { label: Heading level, name: headingLevel, widget: hidden, default: 3 }
                  - { label: Heading variant, name: headingVariant, widget: hidden, default: h5 }
                  - { label: Body variant, name: bodyVariant, widget: hidden, default: body-sm }
                  - { label: Body tone, name: bodyTone, widget: hidden, default: muted }

          - label: Related Labs
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
                  - { label: Container, name: container, widget: select, options: [site, content, none] }
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
              - { label: Grid class, name: gridClass, widget: string }
              - { label: Link class, name: linkClass, widget: string }
              - label: Card
                name: card
                widget: object
                fields:
                  - { label: Surface, name: surface, widget: hidden, default: bordered }
                  - { label: Radius, name: radius, widget: hidden, default: md }
                  - { label: Overflow, name: overflow, widget: hidden, default: hidden }
                  - { label: Class, name: class, widget: string }
              - { label: Media ratio, name: mediaRatio, widget: hidden, default: editorial }
              - { label: Image variant, name: imageVariant, widget: hidden, default: fill }
              - { label: Content class, name: contentClass, widget: string }
              - label: Copy
                name: copy
                widget: object
                fields:
                  - label: Stack
                    name: stack
                    widget: object
                    fields:
                      - { label: Columns, name: columns, widget: hidden, default: one }
                      - { label: Gap, name: gap, widget: select, options: [none, xs, sm, md, lg, xl] }
                  - { label: Heading level, name: headingLevel, widget: hidden, default: 3 }
                  - { label: Heading variant, name: headingVariant, widget: hidden, default: h5 }
                  - { label: Body variant, name: bodyVariant, widget: hidden, default: body-sm }
                  - { label: Body tone, name: bodyTone, widget: hidden, default: muted }
              - label: Metadata row
                name: metaRow
                widget: object
                fields:
                  - { label: Justify, name: justify, widget: hidden, default: between }
                  - { label: Align, name: align, widget: hidden, default: center }
                  - { label: Gap, name: gap, widget: hidden, default: sm }
                  - { label: Metadata tone, name: metadataTone, widget: hidden, default: brand }
                  - { label: Metadata display, name: metadataDisplay, widget: select, options: [text, icon, icon-text] }
                  - { label: Metric appearance, name: metricAppearance, widget: hidden, default: caption }
`;

fs.writeFileSync(configPath, config.replace(marker, `${block}${marker}`));
console.log("Added full Lab Detail Decap editor.");
