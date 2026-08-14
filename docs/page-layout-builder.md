# Page template and builder architecture

```text
CMS JSON
  -> validation / resolution
  -> PageBuilder
  -> Home: PLayout directly
  -> Other pages: PPage dispatcher
       -> selected structural Page template
       -> PLayout region collections
       -> resolved P*/C*/L* blocks
```

## Ownership

- `LPage` is the primitive page/main wrapper only.
- `PPage` selects an approved whole-page structural template.
- `PPage/templates/*` are named only by structural composition, never by page, route, feature, collection, or content domain.
- `PLayout` is a child pattern used by `PPage` templates to render resolved region collections.
- `PageBuilder` resolves canonical JSON sections; it does not define page geometry.
- Homepage stays builder-driven and does not require `PPage`.
- A nested Project pattern keeps its own template contract. For example, `PReader` may use `template: "reader"` without making `reader` a `PPage` template value.

## Approved page-template contract

```text
stacked
lead-content
lead-content-closing
lead-content-navigation
lead-navigation-content
```

`stacked` is rendered directly through `PLayout`; it has no wrapper-only template file.

The other values describe region order only:

```text
lead-content
  -> lead
  -> content

lead-content-closing
  -> lead
  -> content
  -> closing

lead-content-navigation
  -> lead
  -> content
  -> navigation

lead-navigation-content
  -> lead
  -> navigation
  -> content
```

Page type and page template are separate concepts. Two unrelated pages reuse the same template whenever their structural composition is the same.
