// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Replace with your own domain
	site: 'https://<YOUR_USERNAME>.github.io',
	// Replace with your repository name
	base: '/<YOUR_REPO_NAME>',
	integrations: [mdx(), sitemap(), tailwind()],
});
