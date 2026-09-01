import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error("Astro site origin is required to generate robots.txt");
	const sitemap = new URL("/sitemap.xml", site).toString();
	const body = [
		"User-agent: *",
		"Allow: /",
		"Disallow: /admin/",
		`Sitemap: ${sitemap}`,
		"",
	].join("\n");

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
