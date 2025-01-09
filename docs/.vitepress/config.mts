import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/ct-bullet-ui/',
  lang: 'zh-CN',
  title: 'CT-Bullet',
  description: '组件',
  head: [['link', { rel: 'icon', href: '/icon.png' }]],
  lastUpdated: true,
  themeConfig: {
    logo: '/icon.png',
    nav: [
      { text: '组件', link: '/components/button' },
      { text: '日志', link: '/log/' }
    ],
    sidebar: {
      // 指南部分的章节导航
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/' },
            { text: '快速开始', link: '/guide/quick-start' }
          ]
        }
      ],
      // 组件部分的章节导航
      '/components/': [
        {
          text: '组件',
          items: [{ text: 'Button 按钮', link: '/components/button' }]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    footer: {
      message: 'made with by ❤️ yyh',
      copyright: 'Copyright © 2024'
    },
    search: {
      provider: 'local'
    }
  }
});
