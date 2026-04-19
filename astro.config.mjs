import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: "catppuccin-latte",
		},
	},
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
});
