import { promises as fs } from "node:fs";
import path from "node:path";
import { siteOrigin } from "../site.config.mjs";

const distDir = path.resolve("dist");
const requiredStaticFiles = ["robots.txt", "sitemap.xml", "rss.xml", "llms.txt", "llms-full.txt"];

async function walk(directory) {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const absolute = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await walk(absolute));
		else files.push(absolute);
	}
	return files;
}

function matchMeta(html, attribute, value) {
	const pattern = new RegExp(`<meta[^>]+${attribute}=["']${value}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i");
	const reversePattern = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${value}["'][^>]*>`, "i");
	return html.match(pattern)?.[1] ?? html.match(reversePattern)?.[1] ?? null;
}

function matchLink(html, rel) {
	const pattern = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["'][^>]*>`, "i");
	const reversePattern = new RegExp(`<link[^>]+href=["']([^"']+)["'][^>]+rel=["']${rel}["'][^>]*>`, "i");
	return html.match(pattern)?.[1] ?? html.match(reversePattern)?.[1] ?? null;
}

function assert(condition, message, errors) {
	if (!condition) errors.push(message);
}

const files = await walk(distDir);
const htmlFiles = files.filter((file) => file.endsWith(".html") && !file.includes(`${path.sep}admin${path.sep}`));
const sitemap = await fs.readFile(path.join(distDir, "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
const errors = [];
const expectedOrigin = new URL(siteOrigin).origin;

for (const name of requiredStaticFiles) {
	try {
		await fs.access(path.join(distDir, name));
	} catch {
		errors.push(`Missing generated discovery file: ${name}`);
	}
}

for (const file of htmlFiles) {
	const relative = path.relative(distDir, file).replaceAll(path.sep, "/");
	const html = await fs.readFile(file, "utf8");
	const description = matchMeta(html, "name", "description");
	const robots = matchMeta(html, "name", "robots");
	const canonical = matchLink(html, "canonical");
	const ogTitle = matchMeta(html, "property", "og:title");
	const ogDescription = matchMeta(html, "property", "og:description");
	const ogUrl = matchMeta(html, "property", "og:url");
	const twitterCard = matchMeta(html, "name", "twitter:card");
	const twitterTitle = matchMeta(html, "name", "twitter:title");
	const twitterDescription = matchMeta(html, "name", "twitter:description");
	const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? null;
	const noindex = robots?.includes("noindex") ?? false;

	assert(Boolean(title), `${relative}: missing <title>`, errors);
	assert(Boolean(description), `${relative}: missing meta description`, errors);
	assert(Boolean(robots), `${relative}: missing robots directive`, errors);
	assert(Boolean(canonical), `${relative}: missing canonical`, errors);
	assert(Boolean(ogTitle && ogDescription && ogUrl), `${relative}: incomplete Open Graph metadata`, errors);
	assert(Boolean(twitterCard && twitterTitle && twitterDescription), `${relative}: incomplete Twitter metadata`, errors);

	if (canonical) {
		const url = new URL(canonical);
		assert(url.origin === expectedOrigin, `${relative}: canonical uses unexpected origin ${url.origin}`, errors);
		assert(url.search === "", `${relative}: canonical must not contain query parameters`, errors);
		assert(ogUrl === canonical, `${relative}: og:url must match canonical`, errors);
		if (!noindex) {
			assert(sitemapUrls.has(canonical), `${relative}: indexable canonical missing from sitemap`, errors);
		}
	}

	const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
	assert(jsonLdBlocks.length > 0, `${relative}: missing JSON-LD`, errors);
	for (const block of jsonLdBlocks) {
		try {
			const parsed = JSON.parse(block[1]);
			assert(parsed["@context"] === "https://schema.org", `${relative}: JSON-LD missing schema.org context`, errors);
			assert(Array.isArray(parsed["@graph"]), `${relative}: JSON-LD graph is missing`, errors);
		} catch (error) {
			errors.push(`${relative}: invalid JSON-LD (${error.message})`);
		}
	}
}

const robotsText = await fs.readFile(path.join(distDir, "robots.txt"), "utf8");
assert(robotsText.includes(`Sitemap: ${new URL("/sitemap.xml", siteOrigin).toString()}`), "robots.txt: sitemap URL does not match production origin", errors);
assert(robotsText.includes("Disallow: /admin/"), "robots.txt: /admin/ must be disallowed", errors);

if (errors.length > 0) {
	console.error("SEO/GEO validation failed:\n" + errors.map((error) => `- ${error}`).join("\n"));
	process.exit(1);
}

console.log(`SEO/GEO validation passed for ${htmlFiles.length} generated HTML pages and ${sitemapUrls.size} sitemap URLs.`);
