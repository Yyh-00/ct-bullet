import { defineConfig } from 'vitepress';
import { resolve } from 'path';

export default defineConfig({
  base: '/ct-bullet/',
  lang: 'zh-CN',
  title: 'CT-Bullet',
  description: '组件',
  head: [['link', { rel: 'icon', href: '/ct-bullet/icon.png' }]],
  lastUpdated: true,
  themeConfig: {
    logo: '/icon.png',
    nav: [
      { text: '组件', link: '/components/' },
      { text: '日志', link: '/log/' }
    ],
    sidebar: {
      '/components/': [
        {
          text: '基础',
          items: [{ text: '快速开始', link: '/components/' }]
        },
        {
          text: '组件',
          items: [{ text: 'Button 按钮', link: '/components/button' }]
        },
        {
          text: 'hooks',
          items: [
            { text: 'useRefreshTable', link: '/components/hooks/useRefreshTable' },
            { text: 'useVirtualList', link: '/components/hooks/useVirtualList' }
          ]
        },
        {
          text: 'shared',
          items: [
            {
              text: 'file',
              items: [
                { text: 'downloadFileLocal', link: '/components/shared/file/downloadFileLocal' },
                { text: 'getImgResolution', link: '/components/shared/file/getImgResolution' }
              ]
            }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Yyh-00/ct-bullet.git' }],
    footer: {
      message: 'made with by ❤️ yyh',
      copyright: 'Copyright © 2025'
    },
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 4],
      label: 'Contents'
    }
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^@ct-bullet\/(.+)$/,
          replacement: resolve(__dirname, '../../packages', '$1', 'src')
        },
        {
          find: /^ct-bullet$/,
          replacement: resolve(__dirname, '../../packages/ui', 'src')
        }
      ]
    }
  }
});
