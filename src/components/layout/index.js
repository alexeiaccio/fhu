/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { chain, compose, map, option, prop, propPathOr } from 'crocks'
import { withStateHandlers, lifecycle } from 'recompose'

import '../fonts/stylesheet.css'

import Seo from './seo'
import Menu from './menu'
import Title from './title'
import {
  Content,
  Container,
  MainContent,
  MenuContainer,
} from '../elements/shared'

const globalStyles = css`
  html {
    ${tw(['font-sans'])};
  }
  * {
    ${tw(['m-0', 'p-0'])};
    box-sizing: border-box;
  }
  a {
    ${tw(['no-underline'])};
    color: inherit;
    &:hover,
    &:active,
    &:focus {
      color: inherit;
    }
  }
  ul,
  li {
    ${tw(['list-reset'])};
  }
`

const Layout = ({ children, currentTheme, ...props }) => {
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

  const themes = {
    fuchsia: {
      color: '#ff00ff',
    },
    teal: {
      color: '#4dc0b5',
    },
  }

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Container>
        <Global styles={globalStyles} />
        <Seo
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          pageKeywords={pageKeywords}
          pageImage={pageImage}
          pathname={pathname}
        />
        <MenuContainer>
          <Menu location={location} />
        </MenuContainer>
        <MainContent>
          <Title location={location} />
          <div
            css={css`
              ${tw(['overflow-y-auto'])};
              margin-bottom: 2px;
            `}
          >
            <Content>{children}</Content>
          </div>
        </MainContent>
      </Container>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  currentTheme: PropTypes.string.isRequired,
}

export default compose(
  withStateHandlers(
    {
      currentTheme: 'fuchsia',
    },
    {
      changeTheme: () => current => ({ currentTheme: current }),
    }
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.location.pathname === '/') {
        this.props.changeTheme('fuchsia')
      } else {
        this.props.changeTheme('teal')
      }
    },
    componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        if (this.props.location.pathname === '/') {
          this.props.changeTheme('fuchsia')
        } else {
          this.props.changeTheme('teal')
        }
      }
    },
  })
)(Layout)
