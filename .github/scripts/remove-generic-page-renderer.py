from pathlib import Path

ROOT = Path('.')

COMMON_IMPORTS = '''import LSection from "@/components/layout/LSection.astro";
import LSidebar from "@/components/layout/LSidebar.astro";
import CBox from "@/components/object/component/CBox.astro";
import CButton from "@/components/object/component/CButton.astro";
import CColumns from "@/components/object/component/CColumns.astro";
import CDescriptionList from "@/components/object/component/CDescriptionList.astro";
import CGridItem from "@/components/object/component/CGridItem.astro";
import CHeading from "@/components/object/component/CHeading.astro";
import CPagination from "@/components/object/component/CPagination.astro";
import CProfile from "@/components/object/component/CProfile.astro";
import CRow from "@/components/object/component/CRow.astro";
import CTabList from "@/components/object/component/CTabList.astro";
import CTags from "@/components/object/component/CTags.astro";
import CText from "@/components/object/component/CText.astro";
import CTOC from "@/components/object/component/CTOC.astro";
import PAdvertisement from "@/components/object/project/advertisement/PAdvertisement.astro";
import PArchiveToolbar from "@/components/object/project/archive-toolbar/PArchiveToolbar.astro";
import PArticle from "@/components/object/project/article/PArticle.astro";
import PCard from "@/components/object/project/card/PCard.astro";
import PCta from "@/components/object/project/cta/PCta.astro";
import PEntryIndex from "@/components/object/project/entry-index/PEntryIndex.astro";
import PFilterPanel from "@/components/object/project/filter-panel/PFilterPanel.astro";
import PGallery from "@/components/object/project/gallery/PGallery.astro";
import PHero from "@/components/object/project/hero/PHero.astro";
import PPageHeader from "@/components/object/project/page-header/PPageHeader.astro";
import PPostNavigation from "@/components/object/project/post-navigation/PPostNavigation.astro";
import PReader from "@/components/object/project/reader/PReader.astro";
import PReviews from "@/components/object/project/reviews/PReviews.astro";
import PSectionHeader from "@/components/object/project/section-header/PSectionHeader.astro";
import PStatement from "@/components/object/project/statement/PStatement.astro";
import PStatus from "@/components/object/project/status/PStatus.astro";'''


def content(var: str, include_group: bool = True, indent: str = "\t\t") -> str:
    i = indent
    j = i + "\t"
    k = j + "\t"
    l = k + "\t"
    m = l + "\t"
    out = f'''{i}{{{var}.component === "page-header" && <PPageHeader {{...{var}.props}} />}}
{i}{{{var}.component === "hero" && <PHero {{...{var}.props}} />}}
{i}{{{var}.component === "section-header" && <PSectionHeader {{...{var}.props}} />}}
{i}{{{var}.component === "article" && <PArticle {{...{var}.props}} />}}
{i}{{{var}.component === "reviews" && <PReviews {{...{var}.props}} />}}
{i}{{{var}.component === "cards" && (
{j}<CBox
{k}surface={{{var}.props.panel ? "glass" : "plain"}}
{k}radius={{{var}.props.panel ? "md" : "none"}}
{k}spacing={{{var}.props.panel ? "sm" : "none"}}
{j}>
{k}<CColumns columns="one" gap="md">
{l}{{{var}.props.header && {var}.props.headerAction ? (
{m}<CRow justify="between" align="end">
{m}\t<PSectionHeader {{...{var}.props.header}} />
{m}\t<CButton
{m}\t\t{{...{var}.props.headerAction}}
{m}\t\tvariant={{{var}.props.headerAction.variant ?? "text"}}
{m}\t/>
{m}</CRow>
{l}) : (
{m}{var}.props.header && <PSectionHeader {{...{var}.props.header}} />
{l})}}
{l}<PCard {{...{var}.props.cards}} />
{l}{{{var}.props.action && (
{m}<CRow justify="center">
{m}\t<CButton {{...{var}.props.action}} />
{m}</CRow>
{l})}}
{k}</CColumns>
{j}</CBox>
{i})}}
{i}{{{var}.component === "cta" && <PCta {{...{var}.props}} />}}
{i}{{{var}.component === "post-navigation" && <PPostNavigation {{...{var}.props}} />}}
{i}{{{var}.component === "collection" && (
{j}<CColumns
{k}columns="one"
{k}gap="xl"
{k}data-tabbed-collection={{{var}.props.behavior === "tabbed" ? "" : undefined}}
{j}>
{k}{{{var}.props.header && <PSectionHeader {{...{var}.props.header}} />}}
{k}{{{var}.props.tabs && <CTabList {{...{var}.props.tabs}} />}}
{k}<CColumns
{l}columns={{{var}.props.template === "split" ? "twelve" : "one"}}
{l}gap="xl"
{l}data-collection-panel={{{var}.props.behavior === "tabbed" ? "" : undefined}}
{k}>
{l}{{{var}.props.cardGroups.map((cards, index) => (
{m}<CGridItem lgSpan={{{var}.props.template === "split" ? (index === 0 ? 7 : 5) : "full"}}>
{m}\t<PCard {{...cards}} />
{m}</CGridItem>
{l})}}
{k}</CColumns>
{k}{{{var}.props.statement && <PStatement {{...{var}.props.statement}} />}}
{k}{{{var}.props.action && (
{l}<CRow>
{m}<CButton {{...{var}.props.action}} />
{l}</CRow>
{k})}}
{j}</CColumns>
{i})}}
{i}{{{var}.component === "archive" && (
{j}<CColumns
{k}columns="one"
{k}gap="md"
{k}data-filter-root={{{var}.props.mode === "taxonomy" ? "" : undefined}}
{k}data-filter-mode={{{var}.props.mode}}
{k}data-pagination-page-size={{{var}.props.pagination.pageSize}}
{j}>
{k}<PArchiveToolbar {{...{var}.props.toolbar}} />
{k}{{{var}.props.mode === "faceted" && {var}.props.sidebar ? (
{l}<LSidebar label={{{var}.props.sidebar.label}} sticky>
{m}<CColumns slot="sidebar" columns="one" gap="md">
{m}\t<PFilterPanel {{...{var}.props.sidebar.filter}} />
{m}\t{{{var}.props.sidebar.cards && (
{m}\t\t<CBox surface="glass" radius="md" spacing="sm">
{m}\t\t\t<CColumns columns="one" gap="sm">
{m}\t\t\t\t{{{var}.props.sidebar.cardsHeader && (
{m}\t\t\t\t\t<PSectionHeader {{...{var}.props.sidebar.cardsHeader}} />
{m}\t\t\t\t)}}
{m}\t\t\t\t<PCard {{...{var}.props.sidebar.cards}} />
{m}\t\t\t</CColumns>
{m}\t\t</CBox>
{m}\t)}}
{m}\t{{{var}.props.sidebar.advertisement && (
{m}\t\t<PAdvertisement {{...{var}.props.sidebar.advertisement}} />
{m}\t)}}
{m}</CColumns>
{m}<CColumns columns="one" gap="md" data-archive-results>
{m}\t{{{var}.props.result?.header && <PSectionHeader {{...{var}.props.result.header}} />}}
{m}\t{{{var}.props.result?.count !== undefined && {var}.props.result.label && (
{m}\t\t<CText variant="caption" tone="subtle">
{m}\t\t\t<CText as="span" variant="caption" tone="inherit" data-result-count>
{m}\t\t\t\t{{{var}.props.result.count}}
{m}\t\t\t</CText>{{" "}}
{m}\t\t\t{{{var}.props.result.label}}
{m}\t\t</CText>
{m}\t)}}
{m}\t<PCard {{...{var}.props.cards}} />
{m}\t<CText data-product-empty data-facet-empty hidden tone="muted">
{m}\t\t{{{var}.props.emptyLabel}}
{m}\t</CText>
{m}\t<CPagination
{m}\t\tlabel={{{var}.props.pagination.label}}
{m}\t\tpreviousLabel={{{var}.props.pagination.previousLabel}}
{m}\t\tnextLabel={{{var}.props.pagination.nextLabel}}
{m}\t\ttotalPages={{{var}.props.pagination.totalPages}}
{m}\t/>
{m}</CColumns>
{l}</LSidebar>
{k}) : (
{l}<CColumns columns="one" gap="md">
{m}<PCard {{...{var}.props.cards}} />
{m}<CText data-filter-empty hidden tone="muted">{{{var}.props.emptyLabel}}</CText>
{m}<CPagination
{m}\tlabel={{{var}.props.pagination.label}}
{m}\tpreviousLabel={{{var}.props.pagination.previousLabel}}
{m}\tnextLabel={{{var}.props.pagination.nextLabel}}
{m}\ttotalPages={{{var}.props.pagination.totalPages}}
{m}/>
{l}</CColumns>
{k})}}
{j}</CColumns>
{i})}}
{i}{{{var}.component === "status" && <PStatus {{...{var}.props}} />}}
{i}{{{var}.component === "tabs" && <CTabList {{...{var}.props}} />}}
{i}{{{var}.component === "gallery" && <PGallery {{...{var}.props}} />}}
{i}{{{var}.component === "entry-index" && <PEntryIndex {{...{var}.props}} />}}
{i}{{{var}.component === "reader" && <PReader {{...{var}.props}} />}}
{i}{{{var}.component === "details" && (
{j}<CBox
{k}surface={{{var}.props.title ? "glass" : "plain"}}
{k}radius={{{var}.props.title ? "md" : "none"}}
{k}spacing={{{var}.props.title ? "md" : "none"}}
{j}>
{k}<CColumns columns="one" gap="sm">
{l}{{{var}.props.title && <CHeading level={{2}} variant="h5">{{{var}.props.title}}</CHeading>}}
{l}<CDescriptionList
{m}{{...{var}.props.list}}
{m}variant={{{var}.props.title ? "default" : {var}.props.list.variant}}
{l}/>
{l}{{{var}.props.tags && (
{m}<CColumns columns="one" gap="sm">
{m}\t<CHeading level={{3}} variant="h6">{{{var}.props.tags.title}}</CHeading>
{m}\t<CTags {{...{var}.props.tags.list}} />
{m}</CColumns>
{l})}}
{k}</CColumns>
{j}</CBox>
{i})}}
{i}{{{var}.component === "profile" && <CProfile {{...{var}.props}} />}}
{i}{{{var}.component === "toc" && <CTOC {{...{var}.props}} />}}
{i}{{{var}.component === "advertisement" && <PAdvertisement {{...{var}.props}} />}}'''
    if include_group:
        child = content("item", include_group=False, indent=m + "\t")
        out += f'''
{i}{{{var}.component === "group" && (
{j}<CBox
{k}surface={{{var}.props.panel ? "glass" : "plain"}}
{k}radius={{{var}.props.panel ? "md" : "none"}}
{k}spacing={{{var}.props.panel ? "sm" : "none"}}
{j}>
{k}<CColumns columns="one" gap="md">
{l}{{{var}.props.toolbar && <PArchiveToolbar {{...{var}.props.toolbar}} />}}
{l}<LSidebar
{m}label={{{var}.props.asideLabel}}
{m}position={{{var}.props.asidePosition}}
{m}sticky={{{var}.props.stickyAside}}
{l}>
{m}<CColumns slot="sidebar" columns="one" gap={{{var}.props.asideGap ?? "md"}}>
{m}\t{{{var}.props.regions
{m}\t\t.filter((item) => item.enabled !== false && item.placement === "aside")
{m}\t\t.map((item) => (
{m}\t\t\t<Fragment>
{child}
{m}\t\t\t</Fragment>
{m}\t\t))}}
{m}</CColumns>
{m}<CColumns columns="one" gap={{{var}.props.gap ?? "lg"}}>
{m}\t{{{var}.props.regions
{m}\t\t.filter((item) => item.enabled !== false && (item.placement ?? "main") === "main")
{m}\t\t.map((item) => (
{m}\t\t\t<Fragment>
{child}
{m}\t\t\t</Fragment>
{m}\t\t))}}
{m}</CColumns>
{l}</LSidebar>
{k}</CColumns>
{j}</CBox>
{i})}}'''
    return out


def ordering(kind: str) -> str:
    if kind == "stacked":
        return "const orderedRegions = regions;"
    if kind == "lead-content":
        return '''const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const content = regions.filter(
\t(region) => region.component !== "page-header" && region.component !== "hero",
);
const orderedRegions = [...lead, ...content];'''
    if kind == "lead-content-closing":
        return '''const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const closing = regions.filter((region) => region.component === "cta");
const content = regions.filter(
\t(region) =>
\t\tregion.component !== "page-header" &&
\t\tregion.component !== "hero" &&
\t\tregion.component !== "cta",
);
const orderedRegions = [...lead, ...content, ...closing];'''
    if kind == "lead-content-navigation":
        return '''const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const navigation = regions.filter((region) => region.component === "post-navigation");
const content = regions.filter(
\t(region) =>
\t\tregion.component !== "page-header" &&
\t\tregion.component !== "hero" &&
\t\tregion.component !== "post-navigation",
);
const orderedRegions = [...lead, ...content, ...navigation];'''
    if kind == "lead-navigation-content":
        return '''const lead = regions.filter(
\t(region) => region.component === "page-header" || region.component === "hero",
);
const navigation = regions.filter((region) => region.component === "tabs");
const content = regions.filter(
\t(region) =>
\t\tregion.component !== "page-header" &&
\t\tregion.component !== "hero" &&
\t\tregion.component !== "tabs",
);
const orderedRegions = [...lead, ...navigation, ...content];'''
    raise ValueError(kind)


def template_source(kind: str) -> str:
    body = content("region", include_group=True, indent="\t\t")
    return f'''---
{COMMON_IMPORTS}
import type {{ PPageTemplateProps }} from "@/types/components/object/project/page/PPage.types";

const {{ regions }} = Astro.props as PPageTemplateProps;
{ordering(kind)}
---

{{orderedRegions.map((region) => {{
\tconst section = region.section === false ? undefined : region.section;
\treturn (
\t<LSection
\t\tid={{section?.id}}
\t\ttheme={{section?.theme ?? "none"}}
\t\tspacing={{section?.spacing ?? "none"}}
\t\tcontainer={{section?.container ?? "none"}}
\t\tdata-page-region={{region.key}}
\t>
{body}
\t</LSection>
\t);
}})}}
'''

files = {
    "PageStacked.astro": "stacked",
    "PageLeadContent.astro": "lead-content",
    "PageLeadContentClosing.astro": "lead-content-closing",
    "PageLeadContentNavigation.astro": "lead-content-navigation",
    "PageLeadNavigationContent.astro": "lead-navigation-content",
}
base = ROOT / "src/components/object/project/page/templates"
base.mkdir(parents=True, exist_ok=True)
for name, kind in files.items():
    (base / name).write_text(template_source(kind))

ppage = ROOT / "src/components/object/project/page/PPage.astro"
ppage.write_text('''---
import LPage from "@/components/layout/LPage.astro";
import PageStacked from "@/components/object/project/page/templates/PageStacked.astro";
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
\tstacked: PageStacked,
\t"lead-content": PageLeadContent,
\t"lead-content-closing": PageLeadContentClosing,
\t"lead-content-navigation": PageLeadContentNavigation,
\t"lead-navigation-content": PageLeadNavigationContent,
} satisfies Record<PPageTemplate, typeof PageStacked>;

const PageTemplate = templates[template];
---

<LPage data-page-template={template}>
\t<PageTemplate {regions} />
</LPage>
''')

builder = ROOT / "src/components/pages/builder/PageBuilder.astro"
text = builder.read_text()
text = text.replace('import LayoutRegion from "@/components/object/project/layout/parts/LayoutRegion.astro";\n', '')
extra = COMMON_IMPORTS + '\n'
needle = 'import LPage from "@/components/layout/LPage.astro";\n'
if extra not in text:
    text = text.replace(needle, needle + extra)

home_content = content("region", include_group=False, indent="\t\t\t")
old_tail = '''{isHome ? (
\t<LPage data-page-template="home">
\t\t{regions.map((region) => <LayoutRegion {region} />)}
\t</LPage>
) : (
\t<PPage template={pageTemplate} {regions} />
)}'''
new_tail = f'''{{isHome ? (
\t<LPage data-page-template="home">
\t\t{{regions.map((region) => {{
\t\t\tconst section = region.section === false ? undefined : region.section;
\t\t\treturn (
\t\t\t<LSection
\t\t\t\tid={{section?.id}}
\t\t\t\ttheme={{section?.theme ?? "none"}}
\t\t\t\tspacing={{section?.spacing ?? "none"}}
\t\t\t\tcontainer={{section?.container ?? "none"}}
\t\t\t\tdata-page-region={{region.key}}
\t\t\t>
{home_content}
\t\t\t</LSection>
\t\t\t);
\t\t}})}}
\t</LPage>
) : (
\t<PPage template={{pageTemplate}} {{regions}} />
)}}'''
if old_tail not in text:
    raise SystemExit("Expected PageBuilder tail not found")
text = text.replace(old_tail, new_tail)
builder.write_text(text)

layout_parts = ROOT / "src/components/object/project/layout/parts"
if layout_parts.exists():
    for path in layout_parts.iterdir():
        if path.is_file():
            path.unlink()
    try:
        layout_parts.rmdir()
    except OSError:
        pass
layout_dir = ROOT / "src/components/object/project/layout"
if layout_dir.exists():
    try:
        layout_dir.rmdir()
    except OSError:
        pass
