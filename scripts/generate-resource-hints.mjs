import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('dist');
const homepage = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
const stylesheetUrls = [...homepage.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((match) => match[1]);
const fontUrls = [...homepage.matchAll(/<link rel="preload" href="([^"]+)" as="font"/g)].map((match) => match[1]);

const resourceHints = [
  ...stylesheetUrls.map((url) => `<${url}>; rel=preload; as=style`),
  ...fontUrls.map((url) => `<${url}>; rel=preload; as=font; type="font/woff2"; crossorigin`),
];

if (resourceHints.length === 0) {
  throw new Error('No critical stylesheets or fonts were found in the generated homepage.');
}

// Netlify reads this file at deploy time. Response-level preload hints let the
// browser start critical assets before it has parsed the HTML document.
await writeFile(resolve(outputDirectory, '_headers'), `/*\n  Link: ${resourceHints.join(', ')}\n`, 'utf8');
