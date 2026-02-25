// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Aloro Documentation',
  tagline: 'Voice AI Platform Documentation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://acrudu13-png.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // Deployed at /aloro-dashboard/documentation/ to avoid conflict with source docs/ folder
  baseUrl: '/aloro-dashboard/documentation/',

  // GitHub pages deployment config.
  organizationName: 'acrudu13-png', // GitHub username
  projectName: 'aloro-dashboard', // Repo name
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/acrudu13-png/aloro-dashboard/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/acrudu13-png/aloro-dashboard/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/aloro-social-card.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Aloro',
        logo: {
          alt: 'Aloro Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/getting-started/quickstart',
            label: 'Quick Start',
            position: 'left',
          },
          {to: '/blog', label: 'Updates', position: 'left'},
          {
            href: 'https://github.com/acrudu13-png/aloro-dashboard',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/quickstart',
              },
              {
                label: 'Assistants',
                to: '/docs/assistants/overview',
              },
              {
                label: 'Campaigns',
                to: '/docs/campaigns/overview',
              },
            ],
          },
          {
            title: 'Integrations',
            items: [
              {
                label: 'WhatsApp',
                to: '/docs/whatsapp/senders',
              },
              {
                label: 'Web Widget',
                to: '/docs/web-widget/configuration',
              },
              {
                label: 'Webhooks',
                to: '/docs/webhooks/post-call',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Glossary',
                to: '/docs/glossary',
              },
              {
                label: 'Updates',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/acrudu13-png/aloro-dashboard',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Aloro. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['json', 'bash'],
      },
    }),
};

export default config;
