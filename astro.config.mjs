import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";

export default defineConfig({
	markdown: {
		processor: unified({
			remarkPlugins: [remarkBreaks],
			shikiConfig: {
				theme: "catppuccin-latte",
			},
		}),
	},
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
});

