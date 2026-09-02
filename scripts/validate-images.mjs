import { readdir, readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const outputDirectory = resolve("dist");
const expectNetlifyImageCdn = process.env.NETLIFY === "true";

async function findHtmlFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const path = resolve(directory, entry.name);
			return entry.isDirectory() ? findHtmlFiles(path) : [path];
		}),
	);

	return files.flat().filter((path) => extname(path) === ".html");
}

function readAttribute(tag, name) {
	const match = tag.match(
		new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"),
	);
	return match?.[1] ?? match?.[2];
}

const isRasterUpload = (value) => {
	const decoded = decodeURIComponent(value.replaceAll("&amp;", "&"));
	return decoded.includes("/uploads/") && !decoded.match(/\.svg(?:$|[?&])/i);
};

const htmlFiles = await findHtmlFiles(outputDirectory);
const violations = [];
let cmsImages = 0;
let transformedImages = 0;

for (const htmlFile of htmlFiles) {
	const document = await readFile(htmlFile, "utf8");

	for (const match of document.matchAll(/<img\b[^>]*>/gi)) {
		const tag = match[0];
		const src = readAttribute(tag, "src");
		if (!src || !isRasterUpload(src)) continue;

		cmsImages += 1;
		const transformed = src.startsWith("/.netlify/images?");

		if (!expectNetlifyImageCdn) {
			if (transformed) {
				violations.push(`${htmlFile}: local build unexpectedly depends on Netlify Image CDN: ${src}`);
			}
			continue;
		}

		if (!transformed) {
			violations.push(`${htmlFile}: raw CMS upload image source in Netlify production path: ${src}`);
			continue;
		}

		transformedImages += 1;
		const width = Number(readAttribute(tag, "width") ?? 0);
		const srcset = readAttribute(tag, "srcset");
		const sizes = readAttribute(tag, "sizes");

		if (width > 320) {
			const candidates = srcset
				?.split(",")
				.map((candidate) => candidate.trim())
				.filter(Boolean) ?? [];

			if (
				candidates.length < 2 ||
				!candidates.every((candidate) => /\s\d+w$/.test(candidate))
			) {
				violations.push(
					`${htmlFile}: responsive CMS image is missing real width candidates: ${src}`,
				);
			}

			if (!sizes?.trim()) {
				violations.push(`${htmlFile}: responsive CMS image is missing sizes: ${src}`);
			}
		}
	}
}

if (cmsImages === 0) {
	throw new Error("No CMS upload images were found in generated HTML.");
}

if (expectNetlifyImageCdn && transformedImages === 0) {
	throw new Error("No transformed CMS upload images were found in the Netlify production path.");
}

if (violations.length > 0) {
	throw new Error(`Responsive image validation failed:\n${violations.join("\n")}`);
}

console.log(
	expectNetlifyImageCdn
		? `Validated ${transformedImages} transformed CMS images for Netlify production.`
		: `Validated ${cmsImages} CMS images with local source fallback.`,
);
