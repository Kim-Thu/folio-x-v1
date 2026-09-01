import type { APIRoute } from "astro";
import { getIndexablePaths } from "@/data/seo/getDiscoveryData";

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
	if (!site) throw new Error("Astro site origin is required to generate sitemap.xml");
	const paths = await getIndexablePaths();
	const urls = paths
		.map((path) => `  <url><loc>${escapeXml(new URL(path, site).toString())}</loc></url>`)
		.join("\n");
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(body, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
};
