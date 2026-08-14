from pathlib import Path

path = Path("scripts/restructure-page-architecture.py")
text = path.read_text(encoding="utf-8")
text = text.replace('    "src/content/publication-catalog-settings-schema.ts": [\'z.literal("catalog")\'],\n', '')
path.write_text(text, encoding="utf-8")
