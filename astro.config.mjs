import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	markdown: {
		shikiConfig: {
			themes: {
				light: "gruvbox-light-hard",
				dark: "tokyo-night",
			},
		},
	},
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
});
