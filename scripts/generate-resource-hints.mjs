import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const outputDirectory = resolve('dist');
const homepage = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
const stylesheetUrls = [...homepage.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((match) => match[1]);
const fontUrls = [...homepage.matchAll(/<link rel="preload" href="([^"]+)" as="font"/g)].map((match) => match[1]);

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? findHtmlFiles(path) : [path];
  }));

  return files.flat().filter((path) => extname(path) === '.html');
}

const styleHashes = new Set();
for (const htmlFile of await findHtmlFiles(outputDirectory)) {
  const document = await readFile(htmlFile, 'utf8');
  for (const match of document.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/g)) {
    const hash = createHash('sha256').update(match[1], 'utf8').digest('base64');
    styleHashes.add(`'sha256-${hash}'`);
  }
}

const resourceHints = [
  ...stylesheetUrls.map((url) => `<${url}>; rel=preload; as=style`),
  ...fontUrls.map((url) => `<${url}>; rel=preload; as=font; type="font/woff2"; crossorigin`),
];

if (resourceHints.length === 0 || styleHashes.size === 0) {
  throw new Error('Critical resource hints or inline stylesheet hashes are missing from the generated site.');
}

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self'",
  `style-src 'self' ${[...styleHashes].join(' ')}`,
  "font-src 'self'",
  "img-src 'self' data: https://images.unsplash.com",
  "connect-src 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

// Netlify reads this file at deploy time. Response-level font hints start the
// font fetches early, while generated SHA-256 hashes keep inline build output
// compatible with a strict CSP without allowing arbitrary inline styles.
const headers = [
  '/*',
  `  Link: ${resourceHints.join(', ')}`,
  `  Content-Security-Policy: ${contentSecurityPolicy}`,
  '',
].join('\n');

await writeFile(resolve(outputDirectory, '_headers'), headers, 'utf8');
