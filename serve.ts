import { extname, join } from "node:path";

const DIST = join(import.meta.dir, "dist");

async function resolveFile(pathname: string) {
	if (pathname === "/") {
		return Bun.file(join(DIST, "index.html"));
	}

	if (extname(pathname)) {
		const file = Bun.file(join(DIST, pathname));
		return (await file.exists()) ? file : null;
	}

	const asDirIndex = Bun.file(join(DIST, pathname, "index.html"));
	if (await asDirIndex.exists()) {
		return asDirIndex;
	}

	const asFlatFile = Bun.file(join(DIST, `${pathname}.html`));
	if (await asFlatFile.exists()) {
		return asFlatFile;
	}

	return null;
}

const PORT = process.env.PORT ? Number(process.env.PORT) : 80;

Bun.serve({
	port: PORT,
	async fetch(req) {
		const url = new URL(req.url);
		const file = await resolveFile(url.pathname);

		if (file) {
			return new Response(file);
		}

		const notFound = Bun.file(join(DIST, "404.html"));
		if (await notFound.exists()) {
			return new Response(notFound, { status: 404 });
		}

		return new Response("Not Found", { status: 404 });
	},
});

console.log(`Serving at http://localhost:${PORT}`);
