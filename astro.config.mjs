// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Trigger fresh build
export default defineConfig({
  site: 'https://www.zarashalsofokus.com',
  output: 'static',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});