import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, Link, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { equals, map, propPathOr } from '../../utils'
import { hovered } from './hovered'
import Outlined, { outlinedStyles } from './outlined'

const linksStyles = css`
  ${tw([
    'flex-no-shrink',
    'flex-no-grow',
    'flex',
    'flex-row',
    'flex-wrap',
    'md:flex-nowrap',
  ])};
`

const linkStyles = css`
  ${tw([
    'flex-1',
    'w-full',
    'flex',
    'items-center',
    'text-xl',
    'font-extrabold',
    'p-q12',
    'md:px-q24',
  ])};
`

const StyledLink = styled(Link)`
  ${outlinedStyles};
  ${hovered};
  ${linkStyles};
  box-sizing: border-box;
`

const StyledA = styled.a`
  ${outlinedStyles};
  ${hovered};
  ${linkStyles};
  box-sizing: border-box;
`

function Links({ data }) {
  const menu = propPathOr(null, ['links', 'edges'], data)

  return (
    <Outlined css={linksStyles}>
      {map(({ node }) => {
        const items = propPathOr([], ['items'], node)

        return items.map(item => {
          const url = propPathOr('', ['menu', 'url'], item)
          if (!url) return null
          const type = propPathOr(null, ['menu', 'link_type'], item)
          const isDocument = equals('Document', type)
          return isDocument ? (
            <StyledLink css={linkStyles} to={`/${url}`}>
              {propPathOr(
                '',
                ['menu', 'document', 'data', 'title', 'text'],
                item
              )}
            </StyledLink>
          ) : (
            <StyledA
              key={url}
              css={linkStyles}
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {url.replace(/^(https?:\/\/)([^.]+)\.(.+$)/g, (_0, _1, $2) =>
                $2.toUpperCase()
              )}
            </StyledA>
          )
        })
      }, menu)}
    </Outlined>
  )
}

Links.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
}

const withStaticQuery = props => (
  <StaticQuery
    query={graphql`
      query {
        links: allPrismicHomepageBodyMenu(
          filter: { primary: { menuid: { eq: "links" } } }
        ) {
          edges {
            node {
              primary {
                menuid
              }
              items {
                menu {
                  link_type
                  url
                  document {
                    __typename
                    ... on PrismicText {
                      type
                      uid
                      data {
                        title {
                          text
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
    `}
    render={data => <Links data={data} {...props} />}
  />
)

export default withStaticQuery
