// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nexa Exchange Docs',
  tagline: 'Your Keys. Your Coins. Since Block #1',
  url: 'https://docs.nexa.exchange',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Nexa Exchange',
        logo: {
          alt: 'Nexa Exchange Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'welcome',
            position: 'left',
            label: 'Welcome',
          },
          {
            type: 'doc',
            docId: 'faq',
            position: 'left',
            label: 'FAQ',
          },
          {
            type: 'docSidebar',
            sidebarId: 'trade',
            position: 'left',
            label: 'For Traders',
          },
          {
            type: 'docSidebar',
            sidebarId: 'build',
            position: 'left',
            label: 'For Builders',
          },
          {
            type: 'docSidebar',
            sidebarId: 'create',
            position: 'left',
            label: 'For Creators',
          },
          {
            href: 'https://github.com/avasdao/nexa-exchange',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '5 Minute Welcome Tour',
                to: '/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/nexa',
              },
              {
                label: 'Matrix',
                href: 'https://matrix.to/#/#nexa-general:matrix.org',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/AvasDAO',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/avasdao/nexa-exchange',
              },
            ],
          },
        ],
        copyright: `Copyright &copy; ${new Date().getFullYear()}. Nexa Exchange DAO. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
