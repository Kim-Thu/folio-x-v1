from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STRUCTURAL_PAGE_TEMPLATES = [
    "home",
    "stacked",
    "lead-content",
    "lead-content-closing",
    "lead-content-navigation",
    "lead-navigation-content",
]


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def update_json(path: Path, mutate) -> None:
    data = json.loads(path.read_text(encoding="utf-8"))
    mutate(data)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


# ---------------------------------------------------------------------------
# PPage public contract: structural names only.
# ---------------------------------------------------------------------------
write(
    "src/types/components/object/project/page/PPage.types.ts",
    '''import type { PageRegion } from "@/types/components/object/project/layout/PLayout.types";

export type PPageTemplate =
\t| "stacked"
\t| "lead-content"
\t| "lead-content-closing"
\t| "lead-content-navigation"
\t| "lead-navigation-content";

export interface PPageProps {
\ttemplate: PPageTemplate;
\tregions: PageRegion[];
}

export interface PPageTemplateProps {
\tregions: PageRegion[];
}
''',
)

write(
    "src/components/object/project/page/PPage.astro",
    '''---
import LPage from "@/components/layout/LPage.astro";
import PLayout from "@/components/object/project/layout/PLayout.astro";
import PageLeadContent from "@/components/object/project/page/templates/PageLeadContent.astro";
import PageLeadContentClosing from "@/components/object/project/page/templates/PageLeadContentClosing.astro";
import PageLeadContentNavigation from "@/components/object/project/page/templates/PageLeadContentNavigation.astro";
import PageLeadNavigationContent from "@/components/object/project/page/templates/PageLeadNavigationContent.astro";
import type {
\tPPageProps,
\tPPageTemplate,
} from "@/types/components/object/project/page/PPage.types";

const { template, regions } = Astro.props as PPageProps;

const templates = {
\t"lead-content": PageLeadContent,
\t"lead-content-closing": PageLeadContentClosing,
\t"lead-content-navigation": PageLeadContentNavigation,
\t"lead-navigation-content": PageLeadNavigationContent,
} satisfies Record<Exclude<PPageTemplate, "stacked">, typeof PageLeadContent>;

const PageTemplate = template === "stacked" ? undefined : templates[template];
---

<LPage data-page-template={template}>
\t{PageTemplate ? <PageTemplate {regions} /> : <PLayout {regions} />}
</LPage>
''',
)

write(
    "src/components/object/project/page/templates/PageLeadContent.astro",
    '''---
import PLayout from "@/components/object/project/layout/PLayout.astro";
import type { PPageTemplateProps } from "@/types/components/object/project/page/PPage.types";

const { regions } = Astro.props as PPageTemplateProps;
const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const content = regions.filter(
\t(region) => region.component !== "page-header" && region.component !== "hero",
);
---

<PLayout regions={lead} />
<PLayout regions={content} />
''',
)

write(
    "src/components/object/project/page/templates/PageLeadContentClosing.astro",
    '''---
import PLayout from "@/components/object/project/layout/PLayout.astro";
import type { PPageTemplateProps } from "@/types/components/object/project/page/PPage.types";

const { regions } = Astro.props as PPageTemplateProps;
const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const closing = regions.filter((region) => region.component === "cta");
const content = regions.filter(
\t(region) =>
\t\tregion.component !== "page-header" &&
\t\tregion.component !== "hero" &&
\t\tregion.component !== "cta",
);
---

<PLayout regions={lead} />
<PLayout regions={content} />
<PLayout regions={closing} />
''',
)

write(
    "src/components/object/project/page/templates/PageLeadContentNavigation.astro",
    '''---
import PLayout from "@/components/object/project/layout/PLayout.astro";
import type { PPageTemplateProps } from "@/types/components/object/project/page/PPage.types";

const { regions } = Astro.props as PPageTemplateProps;
const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const navigation = regions.filter(
\t(region) => region.component === "post-navigation",
);
const content = regions.filter(
\t(region) =>
\t\tregion.component !== "page-header" &&
\t\tregion.component !== "hero" &&
\t\tregion.component !== "post-navigation",
);
---

<PLayout regions={lead} />
<PLayout regions={content} />
<PLayout regions={navigation} />
''',
)

write(
    "src/components/object/project/page/templates/PageLeadNavigationContent.astro",
    '''---
import PLayout from "@/components/object/project/layout/PLayout.astro";
import type { PPageTemplateProps } from "@/types/components/object/project/page/PPage.types";

const { regions } = Astro.props as PPageTemplateProps;
const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const navigation = regions.filter((region) => region.component === "tabs");
const content = regions.filter(
\t(region) =>
\t\tregion.component !== "page-header" &&
\t\tregion.component !== "hero" &&
\t\tregion.component !== "tabs",
);
---

<PLayout regions={lead} />
<PLayout regions={navigation} />
<PLayout regions={content} />
''',
)

old_templates = [
    "PageArchive.astro",
    "PageCatalog.astro",
    "PageDefault.astro",
    "PageInsightDetail.astro",
    "PageLabDetail.astro",
    "PagePolicy.astro",
    "PageProductDetail.astro",
    "PagePublicationDetail.astro",
    "PageReader.astro",
    "PageSystemState.astro",
    "PageWorkDetail.astro",
]
for filename in old_templates:
    path = ROOT / "src/components/object/project/page/templates" / filename
    if path.exists():
        path.unlink()


# ---------------------------------------------------------------------------
# Canonical JSON page-template choices.
# ---------------------------------------------------------------------------
for path in (ROOT / "src/content/pages").glob("*.json"):
    def mutate_page(data: dict) -> None:
        layout = data.get("content", {}).get("layout")
        if not isinstance(layout, dict):
            return
        current = layout.get("template")
        if current == "home" or data.get("slug") == "/":
            layout["template"] = "home"
            return
        sections = data.get("content", {}).get("sections", [])
        has_closing = any(
            isinstance(section, dict) and section.get("type") == "cta"
            for section in sections
        )
        if current in {"archive", "catalog", "insight-detail", "product-detail"}:
            layout["template"] = "lead-content-closing" if has_closing else "lead-content"
        elif current in {"default", "reader", "policy", "system-state"}:
            layout["template"] = "stacked"
        elif current == "work-detail":
            layout["template"] = "lead-content-navigation"
        elif current in {"lab-detail", "publication-detail"}:
            layout["template"] = "lead-navigation-content"
    update_json(path, mutate_page)

for path in (ROOT / "src/content/projects").glob("*.json"):
    def mutate_project(data: dict) -> None:
        page = data.get("detail", {}).get("page")
        if isinstance(page, dict) and "template" in page:
            page["template"] = "lead-content-navigation"
    update_json(path, mutate_project)

for path in (ROOT / "src/content/products").glob("*.json"):
    def mutate_product(data: dict) -> None:
        page = data.get("detail", {}).get("page")
        if isinstance(page, dict) and "template" in page:
            page["template"] = "lead-content"
    update_json(path, mutate_product)

json_page_templates = {
    "src/content/globals/blog-detail.json": "lead-content",
    "src/content/globals/lab-detail.json": "lead-navigation-content",
    "src/content/globals/publication-detail.json": "lead-navigation-content",
}
for filename, template in json_page_templates.items():
    path = ROOT / filename
    if not path.exists():
        continue
    def mutate_global(data: dict, template: str = template) -> None:
        page = data.get("page")
        if isinstance(page, dict):
            page["template"] = template
    update_json(path, mutate_global)


# ---------------------------------------------------------------------------
# Schema and CMS choices mirror the same structural contract.
# ---------------------------------------------------------------------------
schemas_path = ROOT / "src/content/schemas.ts"
schemas = schemas_path.read_text(encoding="utf-8")
schemas = re.sub(
    r'const pageLayoutSchema = z\.object\(\{\s*template: z\.enum\(\[[^\]]+\]\),\s*\}\);',
    'const pageLayoutSchema = z.object({\n\ttemplate: z.enum(["home", "stacked", "lead-content", "lead-content-closing", "lead-content-navigation", "lead-navigation-content"]),\n});',
    schemas,
    count=1,
    flags=re.S,
)
schemas = schemas.replace('template: z.literal("product-detail")', 'template: z.literal("lead-content")')
schemas_path.write_text(schemas, encoding="utf-8")

schema_replacements = {
    "src/content/project-schema.ts": (
        'template: z.literal("work-detail")',
        'template: z.literal("lead-content-navigation")',
    ),
    "src/content/blog-detail-settings-schema.ts": (
        'page: z.object({ template: z.literal("insight-detail") })',
        'page: z.object({ template: z.literal("lead-content") })',
    ),
    "src/content/lab-detail-settings-schema.ts": (
        'template: z.literal("lab-detail")',
        'template: z.literal("lead-navigation-content")',
    ),
    "src/content/publication-detail-settings-schema.ts": (
        'template: z.literal("publication-detail")',
        'template: z.literal("lead-navigation-content")',
    ),
}
for filename, (old, new) in schema_replacements.items():
    path = ROOT / filename
    text = path.read_text(encoding="utf-8")
    if old not in text:
        raise RuntimeError(f"Missing expected page-template contract in {filename}: {old}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")

config_path = ROOT / "public/admin/config.yml"
config = config_path.read_text(encoding="utf-8")
old_options = "[home, default, archive, catalog, work-detail, insight-detail, lab-detail, product-detail, publication-detail, reader, policy, system-state]"
new_options = "[home, stacked, lead-content, lead-content-closing, lead-content-navigation, lead-navigation-content]"
config = config.replace(old_options, new_options)
config_path.write_text(config, encoding="utf-8")


# ---------------------------------------------------------------------------
# Resolved loaders: only pageTemplate assignments are migrated. Component
# discriminators named archive/reader/default remain untouched.
# ---------------------------------------------------------------------------
page_template_value_map = {
    "work-detail": "lead-content-navigation",
    "insight-detail": "lead-content",
    "lab-detail": "lead-navigation-content",
    "product-detail": "lead-content",
    "publication-detail": "lead-navigation-content",
    "reader": "stacked",
    "policy": "stacked",
    "system-state": "stacked",
    "default": "stacked",
    "catalog": "lead-content",
    "archive": "lead-content",
}
for path in (ROOT / "src").rglob("*.ts"):
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in page_template_value_map.items():
        text = re.sub(
            rf'(pageTemplate\s*:\s*)"{re.escape(old)}"',
            rf'\1"{new}"',
            text,
        )
    if text != original:
        path.write_text(text, encoding="utf-8")

# Publication reader owns a PReader template named "reader". That component
# template must not leak into the PPage template contract.
reader_loader = ROOT / "src/data/pages/getPublicationReaderPageData.ts"
reader_loader_text = reader_loader.read_text(encoding="utf-8")
reader_loader_text = reader_loader_text.replace(
    "pageTemplate: readerPage.template ,",
    'pageTemplate: "stacked",',
)
reader_loader.write_text(reader_loader_text, encoding="utf-8")


# ---------------------------------------------------------------------------
# Architecture documentation describes structure, not page/domain names.
# ---------------------------------------------------------------------------
doc_path = ROOT / "docs/page-layout-builder.md"
doc_path.write_text(
    '''# Page template and builder architecture

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
''',
    encoding="utf-8",
)


# ---------------------------------------------------------------------------
# Guard against the page/domain template names introduced by the prior refactor.
# ---------------------------------------------------------------------------
forbidden_template_files = [
    "PageArchive.astro",
    "PageCatalog.astro",
    "PageDefault.astro",
    "PageInsightDetail.astro",
    "PageLabDetail.astro",
    "PagePolicy.astro",
    "PageProductDetail.astro",
    "PagePublicationDetail.astro",
    "PageReader.astro",
    "PageSystemState.astro",
    "PageWorkDetail.astro",
]
for filename in forbidden_template_files:
    if (ROOT / "src/components/object/project/page/templates" / filename).exists():
        raise RuntimeError(f"Forbidden page/domain template remains: {filename}")

expected_templates = {
    "PageLeadContent.astro",
    "PageLeadContentClosing.astro",
    "PageLeadContentNavigation.astro",
    "PageLeadNavigationContent.astro",
}
actual_templates = {
    path.name
    for path in (ROOT / "src/components/object/project/page/templates").glob("*.astro")
}
if actual_templates != expected_templates:
    raise RuntimeError(
        f"Unexpected PPage template catalogue: {sorted(actual_templates)}"
    )

print("Structural page-template migration complete")
