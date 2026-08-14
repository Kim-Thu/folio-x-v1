# Page template and builder architecture

```text
CMS JSON
  -> validation / resolution
  -> PageBuilder
  -> Home: PLayout directly
  -> Other pages: PPage dispatcher
       -> selected WordPress-style Page template
       -> PLayout region collections
       -> resolved P*/C*/L* blocks
```

## Ownership

- `LPage` is the primitive page/main wrapper only.
- `PPage` selects the approved whole-page structural template.
- `PPage/templates/*` own page-family composition and section grouping.
- `PLayout` is a child pattern used by page templates to render resolved region collections.
- `PageBuilder` resolves canonical JSON sections; it does not define page geometry.
- Homepage stays builder-driven and does not require `PPage`.

Page template values describe whole-page composition; they are not container/column aliases.
