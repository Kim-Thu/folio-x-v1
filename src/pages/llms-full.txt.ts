import type { APIRoute } from "astro";
import { getSiteSettings } from "@/data/cms";
import { getAiDiscoveryResources } from "@/data/seo/getDiscoveryData";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("Astro site origin is required to generate llms-full.txt");
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
		`# ${settings.site.name} — full public resource index`,
		"",
		settings.metadata.description,
		"",
		...sections.flatMap(([title, items]) => [
			`## ${title}`,
			...items.map((item) => `- [${item.title}](${new URL(item.path, site).toString()}): ${item.description}`),
			"",
		]),
	].join("\n");

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
