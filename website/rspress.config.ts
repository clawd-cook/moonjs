import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'MoonJS',
  description: 'A pure-MoonBit JavaScript engine targeting the QuickJS test corpus and TC39 test262.',
  lang: 'en',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'MoonJS',
      description:
        'A pure-MoonBit JavaScript engine targeting the QuickJS test corpus and TC39 test262.',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'MoonJS',
      description:
        '一个用纯 MoonBit 实现的 JavaScript 引擎，目标通过 QuickJS 和 test262 全部用例。',
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/clawd-cook/moonjs',
      },
    ],
    footer: {
      message: 'Released under the Apache-2.0 License.',
    },
  },
});
