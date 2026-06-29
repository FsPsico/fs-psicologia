import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The CMS (Sveltia) writes optional fields left blank as an empty string
// (e.g. `updatedDate: ''`). Treat empty/blank as "not provided" so optional
// fields don't break the build.
const blankToUndefined = (v: unknown) =>
  v === '' || v === null ? undefined : v;

// Blog posts live as Markdown/MDX in src/content/blog/.
// The glob loader keys each entry by file name (the slug).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Used as the meta description / OG description for the post.
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess(blankToUndefined, z.coerce.date().optional()),
    category: z.enum([
      'carreira-e-trabalho',
      'ansiedade-e-transicoes',
      'relacoes-e-autoconhecimento',
    ]),
    tags: z.array(z.string()).default([]),
    // Cover image: a public-path URL (e.g. /assets/uploads/foo.jpg from the
    // CMS, or any /assets/img/… asset). Kept as a string so images uploaded
    // through Sveltia to public/ work without a code change.
    cover: z.preprocess(blankToUndefined, z.string().optional()),
    coverAlt: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
