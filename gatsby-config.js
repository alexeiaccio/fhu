require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')
const { htmlSerializer, linkResolver } = require('./src/utils/prismic')

// SEO configuration
const siteTitle = 'FHU'
const siteUrl = 'https://fhu.art'
const siteDescription = 'Free Home University'
const siteKeywords = 'free, home, university'
const siteThemeColor = '#009688'

// Accounts & API keys
const twitter = ''
const fbAppId = ''
// const gaId = 'your-ga-id'

// Used internally
const utilsTitleShort = 'FHU'
const utilsIcon = 'static/images/icon.png'
const utilsBackgroundColor = '#009688'

// Do not modify unless you know what you're doing
module.exports = {
  siteMetadata: {
    // SEO
    siteTitle,
    siteUrl,
    siteDescription,
    siteKeywords,
    siteThemeColor,
    social: {
      twitter,
      fbAppId,
    },
    // Utils
    utilsTitleShort,
    utilsIcon: path.resolve(__dirname, utilsIcon),
    utilsBackgroundColor,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRICMIC_API,
        accessToken: process.env.PRICMIC_TOKEN,
        linkResolver,
        htmlSerializer,
        /* eslint-disable global-require */
        schemas: {
          about: require('./src/schemas/about.json'),
          chapter: require('./src/schemas/chapter.json'),
          homepage: require('./src/schemas/homepage.json'),
          text: require('./src/schemas/text.json'),
          volume: require('./src/schemas/volume.json'),
        },
      },
    },
    {
      resolve: `@alexeiaccio/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `data`, `tags`],
        resolvers: {
          PrismicText: {
            data: node => {
              const str = node.dataString
              const regexp = new RegExp('(?:text":")(.+?)(?:",")', 'gi')
              const arr = []
              let result
              // eslint-disable-next-line no-cond-assign
              while ((result = regexp.exec(str))) {
                arr.push(result[1])
              }
              return arr.join(' ').replace(/\\n?/g, '')
            },
            tags: node => node.tags,
            title: node => node.data.title.text,
            uid: node => node.uid,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://art.us7.list-manage.com/subscribe/post?u=813aa539fb44184d33c39797e&amp;id=2184db05e1',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: utilsTitleShort,
        start_url: '/',
        theme_color: siteThemeColor,
        background_color: utilsBackgroundColor,
        display: 'minimal-ui',
        icon: utilsIcon, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    `gatsby-transformer-sharp`,
    'gatsby-plugin-webpack-size',
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cache`,
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
  ],
}
