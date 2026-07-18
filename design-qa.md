# Design QA — loading screen

- Source visual truth: user-provided loading-screen reference image in the current conversation.
- Implementation: shared `LoadingScreen.astro` rendered by `BaseLayout.astro` on every route.
- Intended viewports: responsive mobile, tablet, and desktop layouts.
- State: active loading state from 0% through 100% and fade-out.
- Implementation screenshot: unavailable because the configured in-app browser is not available in this session.

## Full-view comparison evidence

Blocked. The reference is available, but a browser-rendered loading state could not be captured at the same viewport.

## Focused region comparison evidence

Blocked for the same reason. Static output verifies the centered transparent image, enlarged tabular progress number, and full-width bottom progress track, but static markup is not visual comparison evidence.

## Verified implementation details

- The supplied 3D astronaut asset has a dedicated 720 × 720 WebP derivative weighing 79,486 bytes.
- Loading content and image metadata are sourced from the interface CMS document and validated by the content schema.
- The progress track is the final flex item in normal flow, spans the full viewport width, and does not use absolute positioning.
- The external loading script updates the numeric value and ARIA progress value, animates to 100%, then removes the overlay after its token-based fade transition.
- `npm run validate` completed successfully and generated 38 routes with zero dependency vulnerabilities.

## Comparison history

- Initial implementation: replaced the dark skeleton loader with the light, centered 3D composition from the reference.
- Progress hierarchy: promoted the percentage to the display type scale and moved the full-width bar to the viewport bottom.
- Performance pass: generated a 79 KB delivery asset instead of loading the 1.63 MB source PNG.
- Visual comparison: blocked before the first comparison because the in-app browser could not be opened.

## Final result

final result: blocked

Blocker: no browser-rendered loading-state screenshot is available for the required side-by-side comparison.

---

# Design QA — ClosingProfile split-name motion

- Source visual truth: user-provided Figma mockup in the current conversation, with collapsed and expanded scroll states.
- Implementation: `ClosingProfile.astro` rendered through the global footer reveal.
- Intended viewport: desktop reference, with the same bounded behavior retained responsively.
- State: collapsed while scrolling upward; expanded when the footer reveal reaches the end of the page.
- Implementation screenshot: unavailable because the configured in-app browser is not available in this session.

## Full-view comparison evidence

Blocked. Static output confirms the intended grouping but is not sufficient visual evidence.

## Focused region comparison evidence

Blocked. The implementation could not be captured in both scroll states at the reference viewport.

## Verified implementation details

- The name is rendered through one reusable SVG rich-text primitive with a fixed viewBox and responsive intrinsic ratio.
- `NGUYỄN` is the left motion group.
- `KIM THU` and the role label share the right motion group.
- Both groups occupy the same CSS Grid cell when collapsed; no absolute positioning is used for the name groups.
- Motion bounds are measured in the foreignObject coordinate system so the groups remain inside the SVG track.
- The text remains inside the `foreignObject`, while both portraits are rendered as native SVG `<image>` elements in the same viewBox. This keeps the complete composition responsive while avoiding browser-dependent lazy image behavior inside `foreignObject`.
- The collapsed state uses `avatar.webp`; the expanded state uses the distinct waving `avatar-2.webp` asset from the reference.
- Both portraits crossfade from the shared footer reveal progress, so reversing scroll direction reverses the image transition.
- A semantic screen-reader heading remains outside the decorative SVG.
- Astro check and production build completed with zero errors, warnings, or hints.

## Comparison history

- Previous structure: the two name values were separate vertical lines and the role moved independently.
- Current structure: both name groups overlap at center, then split left/right; role travels with `KIM THU`.
- Visual comparison: blocked before the first browser comparison because the in-app browser could not be opened.

## Final result

final result: blocked

Blocker: no browser-rendered ClosingProfile screenshots are available for the required two-state comparison.
