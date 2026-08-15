import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, relative, resolve, sep } from 'node:path';

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

function routeForHtmlFile(htmlFile) {
  const outputPath = relative(outputDirectory, htmlFile).split(sep).join('/');
  if (outputPath === 'index.html') return '/';
  if (outputPath.endsWith('/index.html')) {
    return `/${outputPath.slice(0, -'index.html'.length)}`;
  }
  return `/${outputPath}`;
}

const htmlFiles = await findHtmlFiles(outputDirectory);
if (htmlFiles.length === 0) {
  throw new Error('No generated HTML files were found in dist.');
}

const inlineStyleViolations = [];
const routeResources = [];
let stylesheetCount = 0;

for (const htmlFile of htmlFiles) {
  const document = await readFile(htmlFile, 'utf8');

  if (/<style(?:\s[^>]*)?>/i.test(document)) {
    inlineStyleViolations.push(`${htmlFile}: generated <style> block`);
  }
  if (/\sstyle=(?:"[^"]*"|'[^']*')/i.test(document)) {
    inlineStyleViolations.push(`${htmlFile}: inline style attribute`);
  }

  const route = routeForHtmlFile(htmlFile);
  if (route.startsWith('/admin/')) continue;

  const stylesheetUrls = new Set();
  const fontUrls = new Set();

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

  stylesheetCount += stylesheetUrls.size;
  routeResources.push({ route, stylesheetUrls, fontUrls });
}

if (inlineStyleViolations.length > 0) {
  throw new Error(`Inline/internal CSS is not allowed in generated HTML:\n${inlineStyleViolations.join('\n')}`);
}

if (stylesheetCount === 0) {
  throw new Error('No external stylesheet links were found in the generated site.');
}

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data: https://images.unsplash.com",
  "connect-src 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const headers = routeResources
  .sort((left, right) => left.route.localeCompare(right.route))
  .flatMap(({ route, stylesheetUrls, fontUrls }) => {
    const resourceHints = [
      ...[...stylesheetUrls].map((url) => `<${url}>; rel=preload; as=style`),
      ...[...fontUrls].map((url) => `<${url}>; rel=preload; as=font; type="font/woff2"; crossorigin`),
    ];

    return [
      route,
      ...(resourceHints.length > 0 ? [`  Link: ${resourceHints.join(', ')}`] : []),
      `  Content-Security-Policy: ${contentSecurityPolicy}`,
      '',
    ];
  })
  .join('\n');

await writeFile(resolve(outputDirectory, '_headers'), headers, 'utf8');
