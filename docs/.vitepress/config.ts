import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  // outDir: './dist',
  base: '/vitepress-blog/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Typescript', link: '/Typescript/TS-TYPE-CODE.md' }
    ],

    sidebar: [
      {
        text: 'Typescript',
        items: [
          { text: 'ts1', link: '/Typescript/TS-TYPE-CODE.md' },
          { text: 'ts2', link: '/Typescript/深入理解Typescript.md' }
          // { text: 'Markdown Examples', link: '/docs/articles/markdown-examples.md' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
