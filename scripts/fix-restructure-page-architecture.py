from pathlib import Path

path = Path("scripts/restructure-page-architecture.py")
text = path.read_text(encoding="utf-8")
text = text.replace('    "src/content/publication-catalog-settings-schema.ts": [\'z.literal("catalog")\'],\n', '')
text = text.replace(
    'region_block + \'\'\'export interface PLayoutProps {\n\\tregions: PageRegion[];\n}\n\'\'\'',
    'region_block + \'\'\'export interface PageRegionProps {\n\\tregion: PageRegion;\n}\n\nexport interface PLayoutProps {\n\\tregions: PageRegion[];\n}\n\'\'\'',
)
text = text.replace(
    'const content = regions.filter((region) => !lead.includes(region) && !closing.includes(region));',
    'const content = regions.filter((region) => region.component !== "page-header" && region.component !== "hero" && region.component !== "cta");',
)
text = text.replace(
    'const content = regions.filter((region) => !lead.includes(region));',
    'const content = regions.filter((region) => region.component !== "page-header" && region.component !== "hero");',
)
text = text.replace(
    'const content = regions.filter((region) => !header.includes(region));',
    'const content = regions.filter((region) => region.component !== "page-header");',
)
text = text.replace(
    'const known = new Set([...header, ...article, ...reviews, ...navigation]);\nconst remainder = regions.filter((region) => !known.has(region));',
    'const remainder = regions.filter((region) => !["page-header", "article", "reviews", "post-navigation"].includes(region.component));',
)
text = text.replace(
    'const known = new Set([...header, ...navigation, ...content, ...gallery]);\nconst remainder = regions.filter((region) => !known.has(region));',
    'const remainder = regions.filter((region) => !["page-header", "tabs", "group", "article", "details", "gallery"].includes(region.component));',
)
text = text.replace(
    'const known = new Set([...header, ...article]);\nconst remainder = regions.filter((region) => !known.has(region));',
    'const remainder = regions.filter((region) => region.component !== "page-header" && region.component !== "article");',
)
text = text.replace(
    'const known = new Set([...header, ...navigation]);\nconst content = regions.filter((region) => !known.has(region));',
    'const content = regions.filter((region) => region.component !== "page-header" && region.component !== "tabs");',
)
text = text.replace(
    'const remainder = regions.filter((region) => !reader.includes(region));',
    'const remainder = regions.filter((region) => region.component !== "reader");',
)
text = text.replace(
    'const remainder = regions.filter((region) => !status.includes(region));',
    'const remainder = regions.filter((region) => region.component !== "status");',
)
path.write_text(text, encoding="utf-8")
