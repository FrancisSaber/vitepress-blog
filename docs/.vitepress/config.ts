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
      { text: 'Typescript', link: '/Typescript/TS-TYPE-CODE.md' },
      { text: 'Git', link: 'Git/index.md' },
      { text: 'NestJS', link: 'NestJS/Nest.md' }
    ],

    sidebar: [
      {
        text: 'Typescript',
        items: [
          { text: '类型编程', link: '/Typescript/TS-TYPE-CODE.md' },
          { text: '深入理解Typescript', link: '/Typescript/深入理解Typescript.md' }
          // { text: 'Markdown Examples', link: '/docs/articles/markdown-examples.md' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'NestJS',
        items: [
          { text: '笔记1', link: '/NestJS/Nest.md' },
          { text: '笔记2', link: '/NestJS/README.md' }
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
