/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { chain, compose, map, option, prop, propPathOr } from 'crocks'

import '../fonts/stylesheet.css'

import Seo from './seo'
import Menu from './menu'
import { Box } from '../elements/boxs'

const globalStyles = css`
  html {
    ${tw(['font-sans'])};
  }
  * {
    ${tw(['m-0', 'p-0'])};
  }
`

const Container = styled.div`
  ${tw([
    'flex',
    'flex-row',
    'flex-no-grow',
    'h-screen',
    'items-start',
    'p-q24',
    'w-screen',
  ])};
  box-sizing: border-box;
`
const MainContent = styled.div`
  ${Box};
  ${tw(['flex', 'flex-col', 'min-w-1/2'])};
  flex: 10 1 0%;
`
const Layout = ({ children, ...props }) => {
  const pageDataKey = compose(
    option('nope'),
    chain(prop(0)),
    map(Object.keys),
    prop('data')
  )(props)
  const pageData = propPathOr(null, ['data', pageDataKey, 'data'], props)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['seodescription'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(
    null,
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    pageData
  )
  const pathname = propPathOr('/', ['location', 'pathname'], props)
  const location = propPathOr(null, ['location'], props)

  return (
    <Container>
      <Global styles={globalStyles} />
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <Menu location={location} />
      <MainContent>{children}</MainContent>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
