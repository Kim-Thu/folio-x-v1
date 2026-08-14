from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD_PAGE_TEMPLATES = '["fluid", "contained", "boxed", "sidebar", "centered"]'
PAGE_TEMPLATES = '["home", "default", "archive", "catalog", "work-detail", "insight-detail", "lab-detail", "product-detail", "publication-detail", "reader", "policy", "system-state"]'


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def update_json(path: Path, mutate) -> None:
    data = json.loads(path.read_text(encoding="utf-8"))
    mutate(data)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


# ---------------------------------------------------------------------------
# LPage: primitive only. Page-template dispatch does not belong to Layout.
# ---------------------------------------------------------------------------
write(
    "src/components/layout/LPage.astro",
    '''---
import LMain from "@/components/layout/LMain.astro";
import type { LPageProps } from "@/types/components/layout/LPage.types";

const { class: className, ...attributes } = Astro.props as LPageProps;
---

<LMain {...attributes} class={className}>
\t<slot />
</LMain>
''',
)
write(
    "src/types/components/layout/LPage.types.ts",
    '''import type { HTMLAttributes } from "astro/types";

export interface LPageProps extends Omit<HTMLAttributes<"main">, "class"> {
\tclass?: string;
}
''',
)
variant = ROOT / "src/variants/components/layout/LPage.variants.ts"
if variant.exists():
    variant.unlink()


# ---------------------------------------------------------------------------
# Move resolved-region ownership from page layer to PLayout.
# ---------------------------------------------------------------------------
old_builder_types = read("src/types/components/pages/builder/PageBuilder.types.ts")
imports_end = old_builder_types.index("export type PageEntryData")
imports = old_builder_types[:imports_end]
imports = re.sub(r'import type \{ CollectionEntry \} from "astro:content";\n', "", imports)
imports = re.sub(
    r'import type \{ PLayoutProps \} from "@/types/components/object/project/layout/PLayout.types";\n',
    "",
    imports,
)
region_start = old_builder_types.index("export type PageRegionContainer")
region_end = old_builder_types.index("export interface ResolvedPageData")
region_block = old_builder_types[region_start:region_end]
write(
    "src/types/components/object/project/layout/PLayout.types.ts",
    imports + region_block + '''export interface PLayoutProps {
\tregions: PageRegion[];
}
''',
)

write(
    "src/types/components/object/project/page/PPage.types.ts",
    '''import type { PageRegion } from "@/types/components/object/project/layout/PLayout.types";

export type PPageTemplate =
\t| "default"
\t| "archive"
\t| "catalog"
\t| "work-detail"
\t| "insight-detail"
\t| "lab-detail"
\t| "product-detail"
\t| "publication-detail"
\t| "reader"
\t| "policy"
\t| "system-state";

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
    "src/types/components/pages/builder/PageBuilder.types.ts",
    '''import type { CollectionEntry } from "astro:content";
import type { PageRegion } from "@/types/components/object/project/layout/PLayout.types";
import type { PPageTemplate } from "@/types/components/object/project/page/PPage.types";

export type PageEntryData = CollectionEntry<"pages">["data"];
export type PageSectionData = PageEntryData["content"]["sections"][number];

export interface PageBuilderContext {
\tcategorySlug?: string;
\ttagSlug?: string;
\ttechnologySlug?: string;
}

export interface ResolvedPageData {
\tpageTemplate: PPageTemplate;
\tregions: PageRegion[];
}

export type PageBuilderProps =
\t| { page: PageEntryData; context?: PageBuilderContext }
\t| ResolvedPageData;
''',
)

old_to_new = {
    "PageRegion.astro": "LayoutRegion.astro",
    "PageRegionContent.astro": "LayoutRegionContent.astro",
    "ArchiveRegionContent.astro": "ArchiveRegionContent.astro",
    "CollectionRegionContent.astro": "CollectionRegionContent.astro",
    "GroupRegionContent.astro": "GroupRegionContent.astro",
}
for old_name, new_name in old_to_new.items():
    source_path = ROOT / "src/components/pages/builder" / old_name
    text = source_path.read_text(encoding="utf-8")
    text = text.replace(
        '@/types/components/pages/builder/PageBuilder.types',
        '@/types/components/object/project/layout/PLayout.types',
    )
    text = text.replace(
        '@/components/pages/builder/PageRegionContent.astro',
        '@/components/object/project/layout/parts/LayoutRegionContent.astro',
    )
    text = text.replace(
        '@/components/pages/builder/ArchiveRegionContent.astro',
        '@/components/object/project/layout/parts/ArchiveRegionContent.astro',
    )
    text = text.replace(
        '@/components/pages/builder/CollectionRegionContent.astro',
        '@/components/object/project/layout/parts/CollectionRegionContent.astro',
    )
    text = text.replace(
        '@/components/pages/builder/GroupRegionContent.astro',
        '@/components/object/project/layout/parts/GroupRegionContent.astro',
    )
    text = text.replace(
        '@/components/pages/builder/PageRegion.astro',
        '@/components/object/project/layout/parts/LayoutRegion.astro',
    )
    text = text.replace('PageRegionContent', 'LayoutRegionContent')
    text = text.replace('import PageRegion from "@/components/object/project/layout/parts/LayoutRegion.astro";', 'import LayoutRegion from "@/components/object/project/layout/parts/LayoutRegion.astro";')
    text = text.replace('<PageRegion region={item} />', '<LayoutRegion region={item} />')
    write(f"src/components/object/project/layout/parts/{new_name}", text)
    source_path.unlink()

write(
    "src/components/object/project/layout/PLayout.astro",
    '''---
import LayoutRegion from "@/components/object/project/layout/parts/LayoutRegion.astro";
import type { PLayoutProps } from "@/types/components/object/project/layout/PLayout.types";

const { regions } = Astro.props as PLayoutProps;
const enabledRegions = regions.filter((region) => region.enabled !== false);
---

{enabledRegions.map((region) => <LayoutRegion {region} />)}
''',
)


# ---------------------------------------------------------------------------
# PPage: WordPress-style page-template dispatcher. PLayout is its child.
# ---------------------------------------------------------------------------
write(
    "src/components/object/project/page/PPage.astro",
    '''---
import LPage from "@/components/layout/LPage.astro";
import PageArchive from "@/components/object/project/page/templates/PageArchive.astro";
import PageCatalog from "@/components/object/project/page/templates/PageCatalog.astro";
import PageDefault from "@/components/object/project/page/templates/PageDefault.astro";
import PageInsightDetail from "@/components/object/project/page/templates/PageInsightDetail.astro";
import PageLabDetail from "@/components/object/project/page/templates/PageLabDetail.astro";
import PagePolicy from "@/components/object/project/page/templates/PagePolicy.astro";
import PageProductDetail from "@/components/object/project/page/templates/PageProductDetail.astro";
import PagePublicationDetail from "@/components/object/project/page/templates/PagePublicationDetail.astro";
import PageReader from "@/components/object/project/page/templates/PageReader.astro";
import PageSystemState from "@/components/object/project/page/templates/PageSystemState.astro";
import PageWorkDetail from "@/components/object/project/page/templates/PageWorkDetail.astro";
import type { PPageProps, PPageTemplate } from "@/types/components/object/project/page/PPage.types";

const { template, regions } = Astro.props as PPageProps;

const templates = {
\tdefault: PageDefault,
\tarchive: PageArchive,
\tcatalog: PageCatalog,
\t"work-detail": PageWorkDetail,
\t"insight-detail": PageInsightDetail,
\t"lab-detail": PageLabDetail,
\t"product-detail": PageProductDetail,
\t"publication-detail": PagePublicationDetail,
\treader: PageReader,
\tpolicy: PagePolicy,
\t"system-state": PageSystemState,
} satisfies Record<PPageTemplate, typeof PageDefault>;

const PageTemplate = templates[template];
---

<LPage data-page-template={template}>
\t<PageTemplate {regions} />
</LPage>
''',
)


def page_template(name: str, body: str) -> None:
    write(
        f"src/components/object/project/page/templates/{name}.astro",
        '''---\nimport PLayout from "@/components/object/project/layout/PLayout.astro";\nimport type { PPageTemplateProps } from "@/types/components/object/project/page/PPage.types";\n\nconst { regions } = Astro.props as PPageTemplateProps;\n''' + body.split('---\n', 1)[0] + '---\n\n' + body.split('---\n', 1)[1],
    )

page_template(
    "PageDefault",
    '''---\n<PLayout {regions} />\n''',
)
page_template(
    "PageArchive",
    '''const lead = regions.filter((region) => region.component === "page-header" || region.component === "hero");
const closing = regions.filter((region) => region.component === "cta");
const content = regions.filter((region) => !lead.includes(region) && !closing.includes(region));
---
<PLayout regions={lead} />
<PLayout regions={content} />
<PLayout regions={closing} />
''',
)
page_template(
    "PageCatalog",
    '''const lead = regions.filter((region) => region.component === "page-header" || region.component === "hero");
const content = regions.filter((region) => !lead.includes(region));
---
<PLayout regions={lead} />
<PLayout regions={content} />
''',
)
page_template(
    "PageWorkDetail",
    '''const header = regions.filter((region) => region.component === "page-header");
const article = regions.filter((region) => region.component === "article");
const reviews = regions.filter((region) => region.component === "reviews");
const navigation = regions.filter((region) => region.component === "post-navigation");
const known = new Set([...header, ...article, ...reviews, ...navigation]);
const remainder = regions.filter((region) => !known.has(region));
---
<PLayout regions={header} />
<PLayout regions={article} />
<PLayout regions={reviews} />
<PLayout regions={remainder} />
<PLayout regions={navigation} />
''',
)
page_template(
    "PageInsightDetail",
    '''const header = regions.filter((region) => region.component === "page-header");
const content = regions.filter((region) => !header.includes(region));
---
<PLayout regions={header} />
<PLayout regions={content} />
''',
)
page_template(
    "PageLabDetail",
    '''const header = regions.filter((region) => region.component === "page-header");
const navigation = regions.filter((region) => region.component === "tabs");
const content = regions.filter((region) => region.component === "group" || region.component === "article" || region.component === "details");
const gallery = regions.filter((region) => region.component === "gallery");
const known = new Set([...header, ...navigation, ...content, ...gallery]);
const remainder = regions.filter((region) => !known.has(region));
---
<PLayout regions={header} />
<PLayout regions={navigation} />
<PLayout regions={content} />
<PLayout regions={gallery} />
<PLayout regions={remainder} />
''',
)
page_template(
    "PageProductDetail",
    '''const header = regions.filter((region) => region.component === "page-header");
const article = regions.filter((region) => region.component === "article");
const known = new Set([...header, ...article]);
const remainder = regions.filter((region) => !known.has(region));
---
<PLayout regions={header} />
<PLayout regions={article} />
<PLayout regions={remainder} />
''',
)
page_template(
    "PagePublicationDetail",
    '''const header = regions.filter((region) => region.component === "page-header");
const navigation = regions.filter((region) => region.component === "tabs");
const known = new Set([...header, ...navigation]);
const content = regions.filter((region) => !known.has(region));
---
<PLayout regions={header} />
<PLayout regions={navigation} />
<PLayout regions={content} />
''',
)
page_template(
    "PageReader",
    '''const reader = regions.filter((region) => region.component === "reader");
const remainder = regions.filter((region) => !reader.includes(region));
---
<PLayout regions={reader} />
<PLayout regions={remainder} />
''',
)
page_template(
    "PagePolicy",
    '''---\n<PLayout {regions} />\n''',
)
page_template(
    "PageSystemState",
    '''const status = regions.filter((region) => region.component === "status");
const remainder = regions.filter((region) => !status.includes(region));
---
<PLayout regions={status} />
<PLayout regions={remainder} />
''',
)


# ---------------------------------------------------------------------------
# Builder becomes resolver + routing to Home flow or PPage page-template flow.
# ---------------------------------------------------------------------------
builder_path = ROOT / "src/components/pages/builder/PageBuilder.astro"
builder = builder_path.read_text(encoding="utf-8")
builder = builder.replace(
    'import PLayout from "@/components/object/project/layout/PLayout.astro";\nimport PageRegionView from "@/components/pages/builder/PageRegion.astro";\n',
    'import LPage from "@/components/layout/LPage.astro";\nimport PLayout from "@/components/object/project/layout/PLayout.astro";\nimport PPage from "@/components/object/project/page/PPage.astro";\n',
)
builder = builder.replace(
    'import type {\n\tArchiveRegion,\n\tPageBuilderProps,\n\tPageRegion,\n\tPageSectionData,\n} from "@/types/components/pages/builder/PageBuilder.types";',
    'import type {\n\tPageBuilderProps,\n\tPageSectionData,\n} from "@/types/components/pages/builder/PageBuilder.types";\nimport type {\n\tArchiveRegion,\n\tPageRegion,\n} from "@/types/components/object/project/layout/PLayout.types";',
)
end_pattern = re.compile(
    r'const layout = "layout" in props \? props\.layout : props\.page\.content\.layout;\n---\n\n<PLayout \{\.\.\.layout\}>\n\t\{regions\.map\(\(region\) => <PageRegionView region=\{region\} />\)\}\n</PLayout>\n?$',
    re.M,
)
replacement = '''const pageTemplate = "page" in props
\t? props.page.content.layout.template
\t: props.pageTemplate;
const isHome = "page" in props && props.page.slug === "/";
---

{isHome ? (
\t<LPage data-page-template="home">
\t\t<PLayout {regions} />
\t</LPage>
) : (
\t<PPage template={pageTemplate} {regions} />
)}
'''
builder, count = end_pattern.subn(replacement, builder)
if count != 1:
    raise RuntimeError(f"PageBuilder footer replacement count: {count}")
builder_path.write_text(builder, encoding="utf-8")

# Direct PageRegion imports now point to PLayout ownership.
for path in ROOT.glob("src/**/*.ts"):
    text = path.read_text(encoding="utf-8")
    updated = text.replace(
        'import type { PageRegion } from "@/types/components/pages/builder/PageBuilder.types";',
        'import type { PageRegion } from "@/types/components/object/project/layout/PLayout.types";',
    )
    if updated != text:
        path.write_text(updated, encoding="utf-8")

# Resolved detail loaders now return pageTemplate rather than a fake layout wrapper.
for path in (ROOT / "src/data/pages").glob("get*PageData.ts"):
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r'layout:\s*\{\s*template:\s*([^}\n]+)\s*\},',
        r'pageTemplate: \1,',
        text,
    )
    path.write_text(text, encoding="utf-8")


# ---------------------------------------------------------------------------
# Canonical page-template values in JSON.
# ---------------------------------------------------------------------------
page_templates = {
    "home.json": "home",
    "about.json": "default",
    "contact.json": "default",
    "blog.json": "archive",
    "projects.json": "archive",
    "labs.json": "archive",
    "products.json": "archive",
    "comics.json": "catalog",
    "novels.json": "catalog",
    "privacy-policy.json": "policy",
    "terms-of-use.json": "policy",
}
for filename, template in page_templates.items():
    path = ROOT / "src/content/pages" / filename
    if not path.exists():
        continue
    update_json(path, lambda data, template=template: data["content"]["layout"].update({"template": template}))
    update_json(path, lambda data: [data["content"]["layout"].pop(key, None) for key in ("containerSize", "asideLabel", "asidePosition")])

for path in (ROOT / "src/content/projects").glob("*.json"):
    def set_work_detail(data):
        page = data.get("detail", {}).get("page")
        if page:
            page["template"] = "work-detail"
    update_json(path, set_work_detail)

for path in (ROOT / "src/content/products").glob("*.json"):
    def set_product_detail(data):
        page = data.get("detail", {}).get("page")
        if page:
            page["template"] = "product-detail"
    update_json(path, set_product_detail)

settings_templates = {
    "blog-detail.json": ("page", "insight-detail"),
    "lab-detail.json": ("page", "lab-detail"),
    "publication-detail.json": ("page", "publication-detail"),
    "publication-catalog.json": ("page", "catalog"),
}
for filename, (key, template) in settings_templates.items():
    path = ROOT / "src/content/globals" / filename
    if not path.exists():
        continue
    def mutate(data, key=key, template=template):
        if key in data and isinstance(data[key], dict):
            data[key]["template"] = template
        if filename == "publication-detail.json" and isinstance(data.get("reader"), dict):
            data["reader"]["template"] = "reader"
    update_json(path, mutate)


# ---------------------------------------------------------------------------
# Zod schemas: page-template values now describe whole page composition.
# ---------------------------------------------------------------------------
schemas_path = ROOT / "src/content/schemas.ts"
schemas = schemas_path.read_text(encoding="utf-8")
schemas = schemas.replace(
    f'template: z.enum({OLD_PAGE_TEMPLATES}),\n\tcontainerSize: z.enum(["site", "content"]).optional(),\n\tasideLabel: z.string().min(1).optional(),\n\tasidePosition: z.enum(["start", "end"]).optional(),',
    f'template: z.enum({PAGE_TEMPLATES}),',
    1,
)
product_marker = 'const productDetailPageSchema = z.object({\n\ttemplate: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),'
schemas = schemas.replace(
    product_marker,
    'const productDetailPageSchema = z.object({\n\ttemplate: z.literal("product-detail"),',
)
schemas_path.write_text(schemas, encoding="utf-8")

schema_replacements = {
    "src/content/project-schema.ts": ['z.literal("work-detail")'],
    "src/content/blog-detail-settings-schema.ts": ['z.literal("insight-detail")'],
    "src/content/lab-detail-settings-schema.ts": ['z.literal("lab-detail")'],
    "src/content/publication-catalog-settings-schema.ts": ['z.literal("catalog")'],
    "src/content/publication-detail-settings-schema.ts": [
        'z.literal("publication-detail")',
        'z.literal("reader")',
    ],
}
for filename, replacements in schema_replacements.items():
    path = ROOT / filename
    if not path.exists():
        continue
    text = path.read_text(encoding="utf-8")
    for replacement in replacements:
        text, count = re.subn(
            r'z\.enum\(\["fluid", "contained", "boxed", "sidebar", "centered"\]\)',
            replacement,
            text,
            count=1,
        )
        if count != 1:
            raise RuntimeError(f"Missing legacy page template enum in {filename}")
    path.write_text(text, encoding="utf-8")

# Decap: remove obsolete LPage geometry choices from page-template controls.
config_path = ROOT / "public/admin/config.yml"
config = config_path.read_text(encoding="utf-8")
config = config.replace(
    "options: [fluid, contained, boxed, sidebar, centered]",
    "options: [home, default, archive, catalog, work-detail, insight-detail, lab-detail, product-detail, publication-detail, reader, policy, system-state]",
)
config = re.sub(r'\n\s*- \{ label: Container size, name: containerSize, widget: select, required: false, options: \[site, content\] \}', '', config)
config = re.sub(r'\n\s*- \{ label: Aside label, name: asideLabel, widget: string, required: false \}', '', config)
config = re.sub(r'\n\s*- \{ label: Aside position, name: asidePosition, widget: select, required: false, options: \[start, end\] \}', '', config)
config_path.write_text(config, encoding="utf-8")

# Documentation follows the restored ownership.
doc_path = ROOT / "docs/page-layout-builder.md"
if doc_path.exists():
    doc_path.write_text(
        '''# Page template and builder architecture\n\n```text\nCMS JSON\n  -> validation / resolution\n  -> PageBuilder\n  -> Home: PLayout directly\n  -> Other pages: PPage dispatcher\n       -> selected WordPress-style Page template\n       -> PLayout region collections\n       -> resolved P*/C*/L* blocks\n```\n\n## Ownership\n\n- `LPage` is the primitive page/main wrapper only.\n- `PPage` selects the approved whole-page structural template.\n- `PPage/templates/*` own page-family composition and section grouping.\n- `PLayout` is a child pattern used by page templates to render resolved region collections.\n- `PageBuilder` resolves canonical JSON sections; it does not define page geometry.\n- Homepage stays builder-driven and does not require `PPage`.\n\nPage template values describe whole-page composition; they are not container/column aliases.\n''',
        encoding="utf-8",
    )

# Remove this migration script before committing the generated architecture.
Path(__file__).unlink()
