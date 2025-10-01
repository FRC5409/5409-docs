// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '5409 Programming Docs',
  tagline: 'The Chargers',
  favicon: '/img/chargers-logo.jpg',

  // Set the production url of your site here
  url: 'https://frc5409.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/5409-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'frc5409', // Usually your GitHub org/user name.
  projectName: '5409-docs', // Usually your repo name.
  deploymentBranch: "gh-pages",

  onBrokenLinks: 'throw',
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/frc5409/5409-docs/tree/main/',
        },
        blog: false,
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
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '5409',
        logo: {
          alt: '5409 Logo',
          src: 'img/chargers-logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/frc5409/5409-docs',
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
                label: 'Robot Overview',
                to: '/docs/Robots/PastYears',
              },
              {
                label: 'Data Logging',
                to: '/docs/Data Logging/DataLogging',
              },
              {
                label: 'Simulation',
                to: '/docs/Simulation/Intro',
              },
            ],
          },
          {
            title: 'Team 5409',
            items: [
              {
                label: 'Team Website',
                href: 'https://frc5409.hdsb.ca',
              },
              {
                label: 'The Blue Alliance',
                href: 'https://www.thebluealliance.com/team/5409',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'WPILib Documentation',
                href: 'https://docs.wpilib.org/',
              },
              {
                label: 'GitHub Repository',
                href: 'https://github.com/frc5409/5409-docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} FRC Team 5409 - The Chargers. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java'],
      },
    }),
};

export default config;
