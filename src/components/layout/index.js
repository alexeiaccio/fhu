/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core'
import { createRef } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import { withStateHandlers, lifecycle } from 'recompose'
import { Scrollbars } from 'react-custom-scrollbars'

import { chain, compose, map, option, prop, propPathOr } from '../../utils'
import '../fonts/stylesheet.css'

import Seo from './seo'
import Menu from './menu'
import Title from './title'
import {
  Content,
  MainContent,
  MenuContainer,
  OutlinedContainer,
} from '../elements/shared'
import { withMenu } from '../elements/recomposed'

const globalStyles = css`
  html {
    ${tw(['font-sans'])};
  }
  * {
    ${tw(['m-0', 'p-0'])};
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

const Layout = ({
  children,
  currentTheme,
  levels,
  mainScrollbar,
  toggleMenu,
  ...props
}) => {
  const pageDataKey = compose(
    option('nope'),
    chain(prop(0)),
    map(Object.keys),
    prop('data')
  )(props)
  const pageData = propPathOr(null, ['data', pageDataKey, 'data'], props)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['description'], pageData)
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
      <Global styles={globalStyles} />
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <MenuContainer levels={levels}>
        <Menu location={location} />
      </MenuContainer>
      <MainContent
        levels={levels}
        onClick={() =>
          Object.values(levels).length ? toggleMenu(false) : null
        }
      >
        <Title location={location} />
        <OutlinedContainer>
          <Scrollbars ref={mainScrollbar} universal>
            <Content>{children}</Content>
          </Scrollbars>
        </OutlinedContainer>
      </MainContent>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  currentTheme: PropTypes.string.isRequired,
  levels: PropTypes.objectOf(PropTypes.any).isRequired,
  mainScrollbar: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleMenu: PropTypes.func.isRequired,
}

export default compose(
  withStateHandlers(
    {
      currentTheme: 'fuchsia',
      mainScrollbar: createRef(),
    },
    {
      changeTheme: () => current => ({ currentTheme: current }),
    }
  ),
  withMenu,
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
        if (this.props.mainScrollbar.current) {
          this.props.mainScrollbar.current.scrollTop()
        }
        this.props.toggleMenu(false)
        if (this.props.location.pathname === '/') {
          this.props.changeTheme('fuchsia')
        } else {
          this.props.changeTheme('teal')
        }
      }
    },
  })
)(Layout)
