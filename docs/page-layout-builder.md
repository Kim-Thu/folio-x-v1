# Page layout and builder contract

## Responsibilities

- `BaseLayout` owns the document shell, global header, global footer, metadata, and global scripts.
- `LPage` owns page geometry only. Its templates are `fluid`, `contained`, `boxed`, and `sidebar`.
- `PageBuilder` owns ordered region placement: `header`, `main`, `aside`, and `cta`.
- `PageRegion` owns section theme, spacing, and optional container behavior.
- The region registry maps approved component keys to reusable `P*` patterns.
- A region may set `section: false` only when its registered pattern already owns
  the complete section boundary.
- Page data mappers connect content data to the typed builder contract.

Layout and registry components must not contain page, route, collection, or feature names.

## CMS contract

Decap CMS may store only approved values:

- layout template and container size;
- aside position and accessible label;
- region key, enabled state, placement, and order;
- registered component and compatible template;
- section theme, spacing, and container.

CMS content must never store Tailwind classes, direct colors, arbitrary CSS, import paths, or component file names.

`applyPageBuilderControl` merges CMS controls into a typed default configuration. It rejects unknown region keys, component mismatches, and incompatible templates before rendering.

## Styling rules

- Only `LContainer` may use `max-w-*`.
- Reusable visual variants live in variant files and use design tokens.
- `*-button-outline` belongs to `CButton`; other outlined surfaces use the shared gray token.
- Page builders and CMS records do not accept `class` or inline style values.

## Adding a reusable region

1. Reuse or create a generic `P*` pattern composed from existing `C*` components.
2. Name its templates by structure or visual composition, not by page or feature.
3. Add a discriminated region type to `PageBuilder.types.ts`.
4. Register it in `PageRegionContent.astro`.
5. Add only finite CMS enum options and template compatibility rules.
6. Map page content to the region in the page data mapper.

## Current page coverage

Every page composition under `src/components/pages` calls `PageBuilder`:

- home;
- product archive and product detail;
- work archive and work detail;
- system status pages.

Reusable registry roles currently include `hero`, `page-header`, `collection`,
`archive`, `article`, `reviews`, `cards`, `cta`, `post-navigation`, and
`status`.
