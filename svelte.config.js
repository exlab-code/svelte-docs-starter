import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Add preprocessors if you have them, like vitePreprocess
  preprocess: vitePreprocess(),

  kit: {
    // This is the most important part.
    // Ensure the adapter is imported and called correctly.
    adapter: adapter()
  }
};

export default config;
