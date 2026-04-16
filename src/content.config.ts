import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "src/content/posts" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		category: z.enum(["pessoal", "experiencia", "aula", "tutorial"]),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
	}),
});

export const collections = { posts };
