import { getMetadata } from './utils/meta'
import { formatDate } from './utils/date'
const readingTime = require('reading-time')
const meta = getMetadata()

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  // server: {
  //   host: '0.0.0.0', //set to active to test mobile
  //   port: 8000
  // },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Zachary Brooks',
    meta: [
      ...meta,
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/global.css'],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/svg',
    '@nuxtjs/cloudinary'
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxt/content', 'nuxt-webfontloader'],

  hooks: {
    'content:file:beforeInsert': document => {
      // Adding reading time for markdown documents
      if (document.extension === '.md') {
        const { text } = readingTime(document.text)
        const formattedCreatedAtDate = formatDate(document.createdAt)

        document.readingTime = text
        document.formattedCreatedDate = formattedCreatedAtDate
      }
    }
  },

  loadingIndicator: {
    name: 'chasing-dots',
    color: 'var(--color-primary)',
    background: 'var(--color-bg-primary)'
  },
  //Module Configuration
  cloudinary: {
    cloudName: 'zacharybrooks-dev',
    useComponent: true
  },
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  content: {
    markdown: {
      remarkAutolinkHeadings: {
        behavior: 'append',
        linkProperties: {
          ariaHidden: 'true',
          tabIndex: -1,
          title: 'Link to Section',
          className: ['no-external-link']
        },
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['icon', 'icon-link'] },
          children: [{ type: 'text', value: ' #' }]
        }
      },
      remarkExternalLinks: {
        content: {
          type: 'element',
          tagName: 'svg',
          properties: {
            className: ['w-4', 'h-4', 'ml-1', '-mt-1', 'stroke-2'],
            style: ['stroke-linecap: round;', 'stroke-linejoin: round;'],
            fill: 'none',
            viewBox: '0 0 24 24',
            stroke: 'currentColor'
          },
          children: [
            {
              type: 'element',
              tagName: 'path',
              properties: {
                d:
                  'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              }
            }
          ]
        },
        contentProperties: {
          className: ['inline-block', 'align-middle']
        }
      },
      prism: {
        //decide between the code highlighter themes
        // theme: 'prism-themes/themes/prism-shades-of-purple.css'
        theme: 'prism-themes/themes/prism-nord.css'
      }
    }
  },
  // tailwindcss: {
  //   // exposeConfig: true
  // },
  webfontloader: {
    google: {
      families: [
        'Varela:300,400,500,600,700&display=swap',
        'Open+Sans:300,400&display=swap'
      ]
    },
    //Eventually want to add Uni Neue W05 Regular, Bold, Semibold, Italic from
    monotype: {}
  }
}
