# Page layout and builder contract

## Responsibilities

- `BaseLayout` owns the document shell, global header, global footer, metadata, and global scripts.
- `LPage` owns page geometry only. Its templates are `fluid`, `contained`, `boxed`, `sidebar`, and `centered`.
- `PLayout` is the Project-level layout dispatcher. It selects an approved `LPage` template from page data and does not own page content.
- `PageBuilder` renders ordered page regions. It accepts either a validated page entry or a resolved page containing `layout` and `regions`.
- `PageRegion` owns section theme, spacing, and optional container behavior.
- The region registry maps approved component keys to reusable `P*` patterns.
- A region may set `section: false` only when its registered pattern is nested inside another region that owns the section boundary.
- Page data loaders resolve CMS JSON and the current collection entry into the typed builder contract.

Layout and registry components must not contain page, route, collection, or feature names.

## Page pipeline

Standard pages use:

```text
JSON page entry
→ Zod schema
→ page loader
→ PageBuilder
→ PLayout
→ PageRegion dispatcher
→ registered P*/C*/L* patterns
```

Detail and reader pages use the same renderer after their loader resolves entry-specific data:

```text
JSON detail definition + current collection entry
→ validated loader/resolver
→ { layout, regions }
→ PageBuilder
→ PLayout
→ PageRegion dispatcher
```

The detail page root must not manually loop sections or select `PPageHeader`, `PArticle`, `PReviews`, `PReader`, or other section patterns. Section order and page-template selection come from validated CMS/detail data.

A resolved detail payload may also retain the current content entry for route-level document metadata such as `title` and `description`. That entry metadata is not used to compose or order page regions.

## CMS contract

Decap CMS may store only approved values:

- layout template and container size;
- aside position and accessible label;
- section or region ordering;
- registered component-compatible templates;
- section theme, spacing, and container;
- finite presentation choices defined by component contracts.

CMS content must never store Tailwind classes, direct colors, arbitrary CSS, import paths, or component file names.

## Styling rules

- `LContainer` owns shared container width and centering behavior.
- Reusable visual variants live in variant files and use design tokens.
- `*-button-outline` belongs to `CButton`; other outlined surfaces use the shared gray token.
- Page builders and CMS records do not accept raw `class` or inline style values.

## Adding a reusable region

1. Reuse or create a generic `P*` pattern composed from existing `C*` components.
2. Name its templates by structure or visual composition, not by page or feature.
3. Add a discriminated region type to `PageBuilder.types.ts`.
4. Register it in `PageRegionContent.astro`.
5. Add only finite CMS enum options that match the component contract.
6. Resolve page or entry content into that region in the data layer.

## Current page coverage

`PageBuilder` is the common renderer for standard pages and the resolved detail pipeline. Detail-like roots for product, project, lab, insight, publication, and publication reader delegate rendering to `PageBuilder` rather than composing sections manually.

Reusable registry roles include `hero`, `page-header`, `collection`, `archive`, `article`, `reviews`, `cards`, `cta`, `post-navigation`, `status`, `tabs`, `gallery`, `entry-index`, `reader`, `details`, `profile`, `toc`, `advertisement`, and `group`.
