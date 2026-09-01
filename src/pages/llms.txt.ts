import type { APIRoute } from "astro";
import { getSiteSettings } from "@/data/cms";
import { getAiDiscoveryResources } from "@/data/seo/getDiscoveryData";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("Astro site origin is required to generate llms.txt");
	const [settings, resources] = await Promise.all([
		getSiteSettings(),
		getAiDiscoveryResources(),
	]);
	const sections = [
		["Core pages", resources.pages],
		["Writing", resources.blog],
		["Projects", resources.projects],
		["Products", resources.products],
		["Labs", resources.labs],
		["Publications", resources.publications],
	] as const;
	const body = [
		`# ${settings.site.name}`,
		"",
		settings.metadata.description,
		"",
		`Canonical site: ${site.toString()}`,
		`RSS: ${new URL("/rss.xml", site).toString()}`,
		`Sitemap: ${new URL("/sitemap.xml", site).toString()}`,
		"",
		...sections.flatMap(([title, items]) => [
			`## ${title}`,
			...items.slice(0, 12).map((item) => `- [${item.title}](${new URL(item.path, site).toString()}): ${item.description}`),
			"",
		]),
		`Full resource index: ${new URL("/llms-full.txt", site).toString()}`,
		"",
	].join("\n");

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
