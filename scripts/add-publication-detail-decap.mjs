import fs from 'node:fs';

const path = 'public/admin/config.yml';
let source = fs.readFileSync(path, 'utf8');

if (source.includes('      - name: publication_detail\n')) {
  console.log('publication_detail editor already exists');
  process.exit(0);
}

const marker = '      - name: interface\n';
if (!source.includes(marker)) throw new Error('Could not find interface settings marker');

const block = `      - name: publication_detail
        label: Giao diện chi tiết Comics / Novels
        file: src/content/globals/publication-detail.json
        format: json
        fields:
          - label: Page
            name: page
            widget: object
            fields:
              - { label: Template, name: template, widget: string }
          - label: Collections
            name: collections
            widget: object
            fields:
              - label: Comics
                name: comics
                widget: object
                fields: &publication_collection_fields
                  - { label: Collection label, name: collectionLabel, widget: string }
                  - { label: Base path, name: basePath, widget: string }
              - label: Novels
                name: novels
                widget: object
                fields: *publication_collection_fields
          - label: Routes
            name: routes
            widget: object
            fields:
              - { label: Category segment, name: categorySegment, widget: string }
              - { label: Tag segment, name: tagSegment, widget: string }
              - { label: Chapter segment, name: chapterSegment, widget: string }
          - label: Header
            name: header
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - { label: Template, name: template, widget: string }
              - label: Settings
                name: settings
                widget: object
                fields: &publication_section_settings
                  - { label: Theme, name: theme, widget: string }
                  - { label: Spacing, name: spacing, widget: string }
                  - { label: Container, name: container, widget: string }
              - label: Labels
                name: labels
                widget: object
                fields:
                  - { label: Breadcrumb, name: breadcrumb, widget: string }
                  - { label: Tags, name: tags, widget: string }
                  - { label: Author, name: author, widget: string }
                  - { label: Rating, name: rating, widget: string }
                  - { label: Reads, name: reads, widget: string }
                  - { label: Chapters, name: chapters, widget: string }
                  - { label: Followers, name: followers, widget: string }
                  - { label: Actions, name: actions, widget: string }
                  - { label: Primary action, name: primaryAction, widget: string }
                  - { label: Facts title, name: factsTitle, widget: string }
                  - { label: Language, name: language, widget: string }
                  - { label: Status, name: status, widget: string }
                  - { label: Updated, name: updated, widget: string }
                  - { label: Views, name: views, widget: string }
                  - { label: Ongoing, name: ongoing, widget: string }
                  - { label: Complete, name: complete, widget: string }
              - label: Metrics
                name: metrics
                widget: object
                fields:
                  - { label: Rating icon, name: rating, widget: object, fields: [{ label: Icon, name: icon, widget: string }] }
                  - { label: Reads icon, name: reads, widget: object, fields: [{ label: Icon, name: icon, widget: string }] }
                  - { label: Chapters icon, name: chapters, widget: object, fields: [{ label: Icon, name: icon, widget: string }] }
                  - { label: Followers icon, name: followers, widget: object, fields: [{ label: Icon, name: icon, widget: string }] }
              - label: Primary action presentation
                name: primaryAction
                widget: object
                fields: &publication_action_presentation
                  - { label: Icon, name: icon, widget: string }
                  - { label: Icon position, name: iconPosition, widget: string, required: false }
                  - { label: Variant, name: variant, widget: string }
                  - { label: Size, name: size, widget: string }
          - label: Navigation
            name: navigation
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - { label: Settings, name: settings, widget: object, fields: *publication_section_settings }
              - { label: Label, name: label, widget: string }
              - { label: Appearance, name: appearance, widget: string }
              - { label: Tone, name: tone, widget: string }
              - label: Tabs
                name: tabs
                widget: object
                fields:
                  - { label: Chapters, name: chapters, widget: object, fields: &publication_tab_fields [{ label: Label, name: label, widget: string }, { label: Value, name: value, widget: string }, { label: Href, name: href, widget: string }] }
                  - { label: Overview, name: overview, widget: object, fields: *publication_tab_fields }
          - label: Chapters
            name: chapters
            widget: object
            fields:
              - { label: ID, name: id, widget: string }
              - { label: Settings, name: settings, widget: object, fields: *publication_section_settings }
              - label: Labels
                name: labels
                widget: object
                fields:
                  - { label: Aside, name: aside, widget: string }
                  - { label: Introduction, name: introduction, widget: string }
                  - { label: Tags, name: tags, widget: string }
                  - { label: Index, name: index, widget: string }
                  - { label: Title, name: title, widget: string }
                  - { label: List view, name: listView, widget: string }
                  - { label: Number prefix, name: numberPrefix, widget: string }
                  - { label: Chapter, name: chapter, widget: string }
              - label: Overview layout
                name: overviewLayout
                widget: object
                fields:
                  - { label: Columns, name: columns, widget: string }
                  - { label: Gap, name: gap, widget: string }
              - label: Sort
                name: sort
                widget: object
                fields:
                  - { label: ID, name: id, widget: string }
                  - { label: Label, name: label, widget: string }
                  - { label: Value, name: value, widget: string }
                  - label: Options
                    name: options
                    widget: list
                    fields: &publication_option_fields
                      - { label: Label, name: label, widget: string }
                      - { label: Value, name: value, widget: string }
              - label: Item action
                name: itemAction
                widget: object
                fields:
                  - { label: Label, name: label, widget: string }
                  - { label: Icon, name: icon, widget: string }
                  - { label: Icon position, name: iconPosition, widget: string }
                  - { label: Size, name: size, widget: string }
                  - { label: Variant, name: variant, widget: string }
          - label: Reader
            name: reader
            widget: object
            fields:
              - { label: Template, name: template, widget: string }
              - { label: Settings, name: settings, widget: object, fields: *publication_section_settings }
              - label: Labels
                name: labels
                widget: object
                fields:
                  - { label: Breadcrumb, name: breadcrumb, widget: string }
                  - { label: Chapter, name: chapter, widget: string }
                  - { label: Views suffix, name: viewsSuffix, widget: string }
                  - { label: Actions, name: actions, widget: string }
                  - { label: Chapter list, name: chapterList, widget: string }
                  - { label: Settings, name: settings, widget: string }
                  - { label: Theme, name: theme, widget: string }
                  - { label: Next, name: next, widget: string }
                  - { label: Previous, name: previous, widget: string }
                  - { label: Share, name: share, widget: string }
                  - { label: Reactions, name: reactions, widget: string }
                  - { label: Bookmark, name: bookmark, widget: string }
                  - { label: Navigation, name: navigation, widget: string }
              - label: Metadata presentation
                name: metadata
                widget: object
                fields:
                  - { label: Published, name: published, widget: object, fields: &publication_metadata_fields [{ label: Icon, name: icon, widget: string }, { label: Display, name: display, widget: string }] }
                  - { label: Read time, name: readTime, widget: object, fields: *publication_metadata_fields }
              - label: Controls
                name: controls
                widget: object
                fields:
                  - { label: Chapter list, name: chapterList, widget: object, fields: *publication_action_presentation }
                  - { label: Previous, name: previous, widget: object, fields: *publication_action_presentation }
                  - { label: Next, name: next, widget: object, fields: *publication_action_presentation }

`;

source = source.replace(marker, block + marker);
fs.writeFileSync(path, source);
console.log('Added publication_detail Decap editor');
