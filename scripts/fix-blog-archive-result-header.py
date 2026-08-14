from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

builder_path = ROOT / "src/components/pages/builder/PageBuilder.astro"
builder = builder_path.read_text(encoding="utf-8")
old_builder = '''\t\t\tresult: {\n\t\t\t\theader: {\n\t\t\t\t\tdata: { title: result.title },\n\t\t\t\t\tappearance: result.header.appearance as PSectionHeaderProps["appearance"],\n\t\t\t\t\theadingLevel: result.header.headingLevel as PSectionHeaderProps["headingLevel"],\n\t\t\t\t},\n\t\t\t},'''
new_builder = '''\t\t\tresult: {\n\t\t\t\theader: {\n\t\t\t\t\tdata: { title: result.title },\n\t\t\t\t\t...(result.header && {\n\t\t\t\t\t\tappearance: result.header.appearance as PSectionHeaderProps["appearance"],\n\t\t\t\t\t\theadingLevel: result.header.headingLevel as PSectionHeaderProps["headingLevel"],\n\t\t\t\t\t}),\n\t\t\t\t},\n\t\t\t},'''
if old_builder not in builder:
    raise RuntimeError("Expected blog archive result-header block was not found")
builder_path.write_text(builder.replace(old_builder, new_builder, 1), encoding="utf-8")

schema_path = ROOT / "src/content/schemas.ts"
schema = schema_path.read_text(encoding="utf-8")
old_schema = '\t\tresult: z.object({ title: z.string().min(1), header: sectionHeaderPresentationSchema }),'
new_schema = '\t\tresult: z.object({ title: z.string().min(1), header: sectionHeaderPresentationSchema.optional() }),'
if old_schema not in schema:
    raise RuntimeError("Expected blog archive result schema was not found")
schema_path.write_text(schema.replace(old_schema, new_schema, 1), encoding="utf-8")

print("Blog archive result-header contract fixed")
