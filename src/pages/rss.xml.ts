import type { APIRoute } from "astro";
import { getSiteSettings } from "@/data/cms";
import { getBlogFeedEntries } from "@/data/seo/getDiscoveryData";

export const prerender = true;

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("Astro site origin is required to generate RSS");
	const [settings, entries] = await Promise.all([
		getSiteSettings(),
		getBlogFeedEntries(),
	]);
	const items = entries.map((entry) => {
		const url = new URL(`/blog/${entry.data.slug}`, site).toString();
		return [
			"    <item>",
			`      <title>${escapeXml(entry.data.title)}</title>`,
			`      <link>${escapeXml(url)}</link>`,
			`      <guid>${escapeXml(url)}</guid>`,
			`      <description>${escapeXml(entry.data.excerpt)}</description>`,
			`      <pubDate>${new Date(`${entry.data.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>`,
			"    </item>",
		].join("\n");
	}).join("\n");
	const feedUrl = new URL("/rss.xml", site).toString();
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${escapeXml(settings.metadata.title)}</title>\n    <link>${escapeXml(site.toString())}</link>\n    <description>${escapeXml(settings.metadata.description)}</description>\n    <language>${escapeXml(settings.metadata.language)}</language>\n    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />\n${items}\n  </channel>\n</rss>\n`;

	return new Response(body, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
};
