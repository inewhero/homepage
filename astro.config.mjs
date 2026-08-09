import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? '/').split('/');
const isGitHubBuild = Boolean(owner && repository);
const isUserSite = repository === `${owner}.github.io`;

const site =
  process.env.SITE_URL ??
  (isGitHubBuild ? `https://${owner}.github.io` : 'https://example.com');
const base =
  process.env.BASE_PATH ??
  (isGitHubBuild && !isUserSite ? `/${repository}` : '/');

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
