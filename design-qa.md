# Portfolio implementation checkpoint

## Architecture

- Astro components are organized into `primitives`, `patterns`, `features`, and `layouts`.
- Reusable component props live in the matching files under `src/types`.
- Site copy and CMS-editable values come from `src/content/cms`; Astro components do not own editorial content.
- Shared colors, typography, spacing, shape, motion, and layer values are defined in `src/styles/tokens.css`.
- Interactive behavior remains in `src/scripts`; Astro templates contain no inline application logic.

## Current interface

- Homepage contains Hero, About, Selected Work, Insights, Q&A, CTA, Header, Footer, and sticky progress navigation.
- Selected Work uses stable responsive grid placement with category tabs. Card position does not change on reload.
- Project cards expose separate links for the image, title, category archive, and CTA; cards are not wrapped by a competing outer anchor.
- Insight cards expose separate article and category links, while reading duration is semantic `<time>` content.
- Detail, category, tag, policy, 404, and empty-content routes are generated as static pages.

## Validation and delivery

- `npm run validate` runs Astro diagnostics, the production build, and a high-severity dependency audit.
- `.githooks/pre-push` runs the same validation before local pushes.
- `.github/workflows/quality.yml` repeats validation for pull requests and pushes to `main`.
- Netlify builds with Node 24, publishes `dist`, applies security headers, and disables caching for Decap CMS administration routes.

## Known verification limitation

- Source, generated HTML, generated CSS, routes, and production builds have been checked.
- Visual browser automation was unavailable during the final checkpoint. Responsive visual QA should be resumed before considering the design final.
