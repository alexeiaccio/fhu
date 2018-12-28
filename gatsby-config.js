require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')

// SEO configuration
const siteTitle = 'FHU'
const siteUrl = 'https://fhu.art'
const siteDescription = 'Free Home University'
const siteKeywords = 'Gatsby, web'
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
        repositoryName: 'freehome',
        accessToken: process.env.PRICMIC_TOKEN,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `data`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type prismicText, list how to resolve the fields` values
          PrismicText: {
            data: node => node.dataString,
            tags: node => node.tags,
            title: node => node.data.title.text,
            uid: node => node.uid,
          },
        },
      },
    },
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: gaId,
    //     head: false // put GA in the <head> for optimal tracking
    //   }
    // },
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
    'gatsby-plugin-robots-txt',
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
