import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import Layout from '../components/layout/layout'
import Seo from '../components/seo/seo'

const H1 = styled.div`
  color: red;
`

function IndexPage({ data, location }) {
  const seo = {
    pageTitle: 'Welcome',
  }
  console.log(data)

  return (
    <Layout>
      <Seo {...seo} pathname={location.pathname} />
      <H1
        css={css`
          color: green;
        `}
        dangerouslySetInnerHTML={{ __html: data.homepage.data.title.html }}
      />
    </Layout>
  )
}

export default IndexPage

export const PageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          html
        }
        body {
          __typename
          ... on PrismicHomepageBodyListOfArticles {
            items {
              menu {
                document {
                  __typename
                  ... on PrismicVolume {
                    uid
                    data {
                      title {
                        text
                      }
                      body {
                        items {
                          link {
                            document {
                              uid
                              data {
                                title {
                                  text
                                }
                                body {
                                  items {
                                    link {
                                      document {
                                        uid
                                        data {
                                          title {
                                            text
                                          }
                                          image {
                                            url
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PrismicHomepageBodySlider {
            items {
              image {
                url
              }
              link {
                uid
              }
            }
          }
        }
      }
    }
  }
`
