import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const editUrl = 'https://github.com/ballware/ballware-docs/tree/main/';

const config: Config = {
  title: 'ballware docs',
  tagline: 'Documentation for the ballware low-code platform for business applications',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.ballware.de',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ballware', // Usually your GitHub org/user name.
  projectName: 'ballware-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      de: {
        label: 'Deutsch',
        htmlLang: 'de-DE',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: './docs',
          routeBasePath: '/docs',
          sidebarPath: './sidebars.ts',
          editUrl,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'administration',
        path: './administration',
        routeBasePath: '/administration',
        sidebarPath: './administration/sidebars.ts',
        editUrl,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guide',
        path: './guide',
        routeBasePath: '/guide',
        sidebarPath: './guide/sidebars.ts',
        editUrl,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: './api',
        routeBasePath: '/api',
        sidebarPath: './api/sidebars.ts',
        editUrl,
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'api',
        config: {
          metaUser: {
            specPath: 'openapi/meta/meta.json',
            outputDir: 'api/meta',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          metaService: {
            specPath: 'openapi/meta/service.json',
            outputDir: 'api/meta-service',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          genericUser: {
            specPath: 'openapi/generic/generic.json',
            outputDir: 'api/generic',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          genericService: {
            specPath: 'openapi/generic/service.json',
            outputDir: 'api/generic-service',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          genericSchema: {
            specPath: 'openapi/generic/schema.json',
            outputDir: 'api/generic-schema',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          mlUser: {
            specPath: 'openapi/ml/ml.json',
            outputDir: 'api/ml',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          mlService: {
            specPath: 'openapi/ml/service.json',
            outputDir: 'api/ml-service',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          reportingDocument: {
            specPath: 'openapi/reporting/document.json',
            outputDir: 'api/reporting',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          reportingService: {
            specPath: 'openapi/reporting/service.json',
            outputDir: 'api/reporting-service',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          storageUser: {
            specPath: 'openapi/storage/storage.json',
            outputDir: 'api/storage',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
          storageService: {
            specPath: 'openapi/storage/service.json',
            outputDir: 'api/storage-service',
            sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
          },
        },
      },
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    'docusaurus-theme-openapi-docs',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        language: ['en'],
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ballware',
      logo: {
        alt: 'ballware Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Platform',
        },
        {
          type: 'docSidebar',
          sidebarId: 'adminSidebar',
          docsPluginId: 'administration',
          position: 'left',
          label: 'Administration',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          docsPluginId: 'guide',
          position: 'left',
          label: 'User Guide',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          docsPluginId: 'api',
          position: 'left',
          label: 'API',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ballware/ballware-docs',
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
            {label: 'Platform', to: '/docs/overview'},
            {label: 'Administration', to: '/administration/'},
            {label: 'User Guide', to: '/guide/'},
            {label: 'API Reference', to: '/api/'},
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {label: 'ballware on GitHub', href: 'https://github.com/ballware'},
            {label: 'ballware-angular', href: 'https://github.com/ballware/ballware-angular'},
            {label: 'ballware-meta-service', href: 'https://github.com/ballware/ballware-meta-service'},
            {label: 'ballware-generic-service', href: 'https://github.com/ballware/ballware-generic-service'},
            {label: 'ballware-storage-service', href: 'https://github.com/ballware/ballware-storage-service'},
            {label: 'ballware-apigateway', href: 'https://github.com/ballware/ballware-apigateway'},
            {label: 'ballware-keycloak', href: 'https://github.com/ballware/ballware-keycloak'},
          ],
        },
        {
          title: 'Contact',
          items: [
            {label: 'ballware Software & Consulting Frank Ballmeyer', href: 'https://github.com/ballware'},
            {label: 'Public API entry point', href: 'https://api.ballware.de'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ballware Software & Consulting Frank Ballmeyer.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
