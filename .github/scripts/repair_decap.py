from pathlib import Path

path = Path("public/admin/config.yml")
text = path.read_text()

text = text.replace("branch: agent/cms-content-migration", "branch: main", 1)

home_start = text.index("      - name: home\n")
home_end = text.index("\n      - name: blog_page\n", home_start)
home = text[home_start:home_end]
home = home.replace(
    "              - { label: Updated at, name: updatedAt, widget: string, required: false }\n          - label: Content\n",
    "              - { label: Updated at, name: updatedAt, widget: string, required: false }\n          - { label: SEO, name: seo, widget: hidden, required: false }\n          - label: Content\n",
    1,
)
home = home.replace(
    "                          - { label: Actions label, name: actionsLabel, widget: string, required: false }\n",
    """                          - label: Social links
                            name: socialLinks
                            widget: list
                            required: false
                            fields:
                              - { label: Label, name: label, widget: string }
                              - { label: Short label, name: shortLabel, widget: string }
                              - { label: Icon, name: icon, widget: select, required: false, options: [github, linkedin] }
                              - { label: Href, name: href, widget: string }
                          - { label: Actions label, name: actionsLabel, widget: string, required: false }
""",
    1,
)

cards_marker = "                          - label: Cards\n                            name: cards\n"
item_presentation = """                          - label: Item presentation
                            name: itemPresentation
                            widget: object
                            required: false
                            fields:
                              - label: Routes
                                name: routes
                                widget: object
                                required: false
                                fields:
                                  - { label: Base, name: base, widget: string, required: false }
                                  - { label: Category base, name: categoryBase, widget: string, required: false }
                                  - { label: Tag base, name: tagBase, widget: string, required: false }
                                  - { label: Technology base, name: technologyBase, widget: string, required: false }
                              - { label: ARIA label prefix, name: ariaLabelPrefix, widget: string, required: false }
                              - { label: Image alt suffix, name: imageAltSuffix, widget: string, required: false }
                              - { label: Image width, name: imageWidth, widget: number, value_type: int, min: 1, required: false }
                              - { label: Image height, name: imageHeight, widget: number, value_type: int, min: 1, required: false }
                              - { label: Category display, name: categoryDisplay, widget: select, required: false, options: [icon, icon-text, text] }
                              - { label: Action href, name: actionHref, widget: string, required: false }
                              - { label: Action label prefix, name: actionLabelPrefix, widget: string, required: false }
                              - { label: Action label, name: actionLabel, widget: string, required: false }
                              - { label: Action icon, name: actionIcon, widget: select, required: false, options: [arrowLeft, arrowRight, arrowUp, arrowUpRight, arrowPath, archiveBox, bars3, bolt, chevronLeft, chevronDown, chevronRight, github, globeAlt, lightBulb, linkedin, xMark, folder01, facebook, link, twitter, userCircle, calendar03, check, clock01, gridView, listView, play, search, shoppingBag, star, questionMarkCircle, bookOpen, bookmark, eye, lockClosed, adjustmentsHorizontal, moon, handThumbUp, heart, faceSmile, faceFrown] }
                              - { label: License, name: license, widget: select, required: false, options: [free, pro] }
                              - { label: Separator, name: separator, widget: string, required: false }
                              - { label: Size, name: size, widget: select, required: false, options: [standard, wide] }
                              - { label: Tags label, name: tagsLabel, widget: string, required: false }
                              - { label: Light appearance, name: lightAppearance, widget: select, required: false, options: [default, inverse] }
                              - { label: Dark appearance, name: darkAppearance, widget: select, required: false, options: [default, inverse] }
                              - { label: Metadata display, name: metadataDisplay, widget: select, required: false, options: [icon, icon-text, text] }
                              - { label: Complete badge tone, name: completeBadgeTone, widget: select, required: false, options: [brand, neutral, inverse] }
                              - { label: Active badge tone, name: activeBadgeTone, widget: select, required: false, options: [brand, neutral, inverse] }
                              - { label: Tags label suffix, name: tagsLabelSuffix, widget: string, required: false }
                              - label: Metric icons
                                name: metricIcons
                                widget: list
                                required: false
                                field: { label: Icon, name: icon, widget: select, options: [arrowLeft, arrowRight, arrowUp, arrowUpRight, arrowPath, archiveBox, bars3, bolt, chevronLeft, chevronDown, chevronRight, github, globeAlt, lightBulb, linkedin, xMark, folder01, facebook, link, twitter, userCircle, calendar03, check, clock01, gridView, listView, play, search, shoppingBag, star, questionMarkCircle, bookOpen, bookmark, eye, lockClosed, adjustmentsHorizontal, moon, handThumbUp, heart, faceSmile, faceFrown] }
                              - { label: Views icon, name: viewsIcon, widget: select, required: false, options: [arrowLeft, arrowRight, arrowUp, arrowUpRight, arrowPath, archiveBox, bars3, bolt, chevronLeft, chevronDown, chevronRight, github, globeAlt, lightBulb, linkedin, xMark, folder01, facebook, link, twitter, userCircle, calendar03, check, clock01, gridView, listView, play, search, shoppingBag, star, questionMarkCircle, bookOpen, bookmark, eye, lockClosed, adjustmentsHorizontal, moon, handThumbUp, heart, faceSmile, faceFrown] }
                              - label: Comics presentation
                                name: comics
                                widget: object
                                required: false
                                fields: &publication_item_presentation_fields
                                  - label: Routes
                                    name: routes
                                    widget: object
                                    fields:
                                      - { label: Base, name: base, widget: string }
                                      - { label: Category base, name: categoryBase, widget: string }
                                  - { label: ARIA label prefix, name: ariaLabelPrefix, widget: string }
                                  - { label: Category display, name: categoryDisplay, widget: select, options: [icon, icon-text, text] }
                                  - { label: Tags label suffix, name: tagsLabelSuffix, widget: string }
                                  - { label: Views icon, name: viewsIcon, widget: select, options: [arrowLeft, arrowRight, arrowUp, arrowUpRight, arrowPath, archiveBox, bars3, bolt, chevronLeft, chevronDown, chevronRight, github, globeAlt, lightBulb, linkedin, xMark, folder01, facebook, link, twitter, userCircle, calendar03, check, clock01, gridView, listView, play, search, shoppingBag, star, questionMarkCircle, bookOpen, bookmark, eye, lockClosed, adjustmentsHorizontal, moon, handThumbUp, heart, faceSmile, faceFrown] }
                              - label: Novels presentation
                                name: novels
                                widget: object
                                required: false
                                fields: *publication_item_presentation_fields
"""
if "name: itemPresentation" not in home:
    home = home.replace(cards_marker, item_presentation + cards_marker, 1)
text = text[:home_start] + home + text[home_end:]

blog_page_start = text.index("      - name: blog_page\n")
blog_page_end = text.index("\n      - name: lab_detail\n", blog_page_start)
blog_page = text[blog_page_start:blog_page_end]
blog_page = blog_page.replace("                    name: page_header\n", "                    name: page-header\n", 1)
text = text[:blog_page_start] + blog_page + text[blog_page_end:]

projects_start = text.index("  - name: projects\n")
projects_end = text.index("\n  - name: labs\n", projects_start)
projects = text[projects_start:projects_end]
projects = projects.replace(
    "      - { label: Title, name: title, widget: string }\n      - { label: Category, name: category, widget: string }\n",
    "      - { label: Title, name: title, widget: string }\n      - { label: Client, name: client, widget: string }\n      - { label: Category, name: category, widget: string }\n",
    1,
)
projects = projects.replace(
    "          - { label: Slug, name: slug, widget: string }\n      - label: Detail\n",
    """          - { label: Slug, name: slug, widget: string }
      - label: Content sections
        name: sections
        widget: list
        fields:
          - { label: Title, name: title, widget: string }
          - label: Paragraphs
            name: paragraphs
            widget: list
            field: { label: Paragraph, name: paragraph, widget: text }
      - label: Detail
""",
    1,
)
projects = projects.replace(
    "          - { label: Duration, name: duration, widget: string, required: false }\n",
    "          - { label: Duration, name: duration, widget: string, required: false }\n          - { label: Show back action, name: showBackAction, widget: boolean, required: false }\n",
    1,
)
projects = projects.replace("                    name: project_header\n", "                    name: page-header\n", 1)
projects = projects.replace("                    name: post_navigation\n", "                    name: post-navigation\n", 1)
text = text[:projects_start] + projects + text[projects_end:]

labs_start = text.index("  - name: labs\n")
labs_end = text.index("\n  - name: blog\n", labs_start)
labs = text[labs_start:labs_end]
labs = labs.replace("            name: feature_grid\n", "            name: feature-grid\n", 1)
labs = labs.replace("            name: metric_grid\n", "            name: metric-grid\n", 1)
text = text[:labs_start] + labs + text[labs_end:]

comics_start = text.index("  - name: comics\n")
comics_end = text.index("\n  - name: novels\n", comics_start)
comics = text[comics_start:comics_end]
comics = comics.replace(
    "            summary: \"#{{fields.number}} — {{fields.title}}\"\n            types:\n",
    "            summary: \"#{{fields.number}} — {{fields.title}}\"\n            typeKey: kind\n            types:\n",
    1,
)
comics = comics.replace("                name: sequential_media\n", "                name: sequential-media\n", 1)
text = text[:comics_start] + comics + text[comics_end:]

path.write_text(text)
