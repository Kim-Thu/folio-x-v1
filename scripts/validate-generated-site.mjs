import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distRoot = join(root, "dist");
const contentRoot = join(root, "src", "content");

const failures = [];

const fail = (message) => {
	failures.push(message);
};

const readJson = (filePath) => JSON.parse(readFileSync(filePath, "utf8"));

const jsonFiles = (directory) =>
	readdirSync(directory)
		.filter((name) => name.endsWith(".json"))
		.map((name) => join(directory, name));

const routeFile = (...segments) => join(distRoot, ...segments, "index.html");

const assertRoute = (filePath, label) => {
	if (!existsSync(filePath)) {
		fail(`Missing generated route for ${label}: ${filePath}`);
		return false;
	}

	return true;
};

const validateEntryCollection = (collection) => {
	const directory = join(contentRoot, collection);

	if (!existsSync(directory)) return;

	for (const filePath of jsonFiles(directory)) {
		const entry = readJson(filePath);

		if (typeof entry.slug !== "string" || entry.slug.length === 0) {
			fail(`Missing slug in ${filePath}`);
			continue;
		}

		assertRoute(routeFile(collection, entry.slug), `${collection}/${entry.slug}`);
	}
};

const validatePublicationCollection = (collection) => {
	const directory = join(contentRoot, "publications", collection);

	if (!existsSync(directory)) return;

	for (const filePath of jsonFiles(directory)) {
		const entry = readJson(filePath);

		if (typeof entry.slug !== "string" || entry.slug.length === 0) {
			fail(`Missing slug in ${filePath}`);
			continue;
		}

		const detailPath = routeFile(collection, entry.slug);
		if (!assertRoute(detailPath, `${collection}/${entry.slug}`)) continue;

		const chapterCount = Number.isInteger(entry.chapters) ? entry.chapters : 0;
		if (chapterCount <= 0) continue;

		const detailHtml = readFileSync(detailPath, "utf8");
		if (!detailHtml.includes('id="chapters"')) {
			fail(`${collection}/${entry.slug} has ${chapterCount} chapters but no #chapters section`);
		}

		for (let number = 1; number <= chapterCount; number += 1) {
			const href = `/${collection}/${entry.slug}/chapter/${number}`;
			const chapterPath = routeFile(collection, entry.slug, "chapter", String(number));

			assertRoute(chapterPath, `${collection}/${entry.slug}/chapter/${number}`);

			if (!detailHtml.includes(`href="${href}"`) && !detailHtml.includes(`href="${href}/"`)) {
				fail(`${collection}/${entry.slug} is missing chapter link ${href}`);
			}
		}
	}
};

if (!existsSync(distRoot)) {
	throw new Error("dist/ does not exist. Run the Astro build before generated-site validation.");
}

for (const collection of ["products", "projects", "labs", "blog"]) {
	validateEntryCollection(collection);
}

for (const collection of ["comics", "novels"]) {
	validatePublicationCollection(collection);
}

if (failures.length > 0) {
	console.error("Generated-site integrity validation failed:\n");
	for (const message of failures) console.error(`- ${message}`);
	process.exit(1);
}

console.log("Generated-site integrity validation passed.");
