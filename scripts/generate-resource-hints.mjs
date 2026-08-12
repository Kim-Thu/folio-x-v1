import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const outputDirectory = resolve('dist');

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? findHtmlFiles(path) : [path];
  }));

  return files.flat().filter((path) => extname(path) === '.html');
}

function readAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match?.[1] ?? match?.[2];
}

const htmlFiles = await findHtmlFiles(outputDirectory);
if (htmlFiles.length === 0) {
  throw new Error('No generated HTML files were found in dist.');
}

const stylesheetUrls = new Set();
const fontUrls = new Set();
const styleHashes = new Set();

for (const htmlFile of htmlFiles) {
  const document = await readFile(htmlFile, 'utf8');

  for (const match of document.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = readAttribute(tag, 'rel')?.toLowerCase();
    const href = readAttribute(tag, 'href');
    if (!href) continue;

    if (rel?.split(/\s+/).includes('stylesheet')) {
      stylesheetUrls.add(href);
    }

    if (rel?.split(/\s+/).includes('preload') && readAttribute(tag, 'as')?.toLowerCase() === 'font') {
      fontUrls.add(href);
    }
  }

  for (const match of document.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)) {
    const hash = createHash('sha256').update(match[1], 'utf8').digest('base64');
    styleHashes.add(`'sha256-${hash}'`);
  }
}

const resourceHints = [
  ...stylesheetUrls].map((url) => `<${url}>; rel=preload; as=style`)
  .concat([...fontUrls].map((url) => `<${url}>; rel=preload; as=font; type="font/woff2"; crossorigin`));

if (resourceHints.length === 0) {
  throw new Error('No critical stylesheet or font resources were found in the generated site.');
}

const styleSources = ["'self'", ...styleHashes];
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self'",
  `style-src ${styleSources.join(' ')}`,
  "font-src 'self'",
  "img-src 'self' data: https://images.unsplash.com",
  "connect-src 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

// Netlify reads this file at deploy time. Response-level hints start critical
// stylesheet/font fetches early. Inline style hashes are added only when the
// generated HTML actually contains inline styles; an external-only build needs
// no style hashes and remains covered by style-src 'self'.
const headers = [
  '/*',
  `  Link: ${resourceHints.join(', ')}`,
  `  Content-Security-Policy: ${contentSecurityPolicy}`,
  '',
].join('\n');

await writeFile(resolve(outputDirectory, '_headers'), headers, 'utf8');
