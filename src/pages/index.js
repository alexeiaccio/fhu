import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const H1 = styled.div`
  color: red;
`

function IndexPage({ data }) {
  return (
    <Fragment>
      <H1
        css={css`
          color: green;
        `}
        dangerouslySetInnerHTML={{ __html: data.homepage.data.title.html }}
      />
    </Fragment>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
  }).isRequired,
}

export default IndexPage

export const PageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          html
          text
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
