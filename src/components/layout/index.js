import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Scrollbars } from 'react-custom-scrollbars'
import { Location } from '@reach/router'

import About from './about'
import Content from './content'
import Container from './container'
import globalStyles from './global-styles'
import Header from './header'
import MainContainer from './main-container'
import Menu from './menu'
import MenuContainer from './menu-container'
import MobileMenu from './mobile-menu'
import Outlined from './outlined'
import themes from './themes'
import { Provider, Consumer } from './context'

import '../fonts/stylesheet.css'

class Layout extends Component {
  constructor() {
    super()
    this.mainScrollbar = createRef()
    this.state = {
      currentTheme: 'fuchsia',
      isMenu: false,
      isMobile: null,
      isVisible: {},
    }
  }

  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.changeTheme('fuchsia')
    } else {
      this.changeTheme('teal')
    }
    this.handleMobile()
    if (window !== undefined) {
      window.addEventListener('resize', this.handleMobile)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (this.mainScrollbar.current) {
        this.mainScrollbar.current.scrollTop()
      }
      this.toggleMenu(false)
      if (this.props.location.pathname === '/') {
        this.changeTheme('fuchsia')
      } else {
        this.changeTheme('teal')
      }
    }
  }

  componentWillUnmount() {
    if (window !== undefined) {
      window.removeEventListener('resize', this.handleMobile)
    }
  }

  handleMobile = () => {
    if (window !== undefined) {
      if (!this.state.isMobile && window.innerWidth < 769) {
        this.setState({ isMobile: true })
      } else if (this.state.isMobile && window.innerWidth > 768) {
        this.setState({ isMobile: false })
      }
    }
  }

  changeTheme = current => {
    this.setState({ currentTheme: current })
  }

  toggle = (key, level) =>
    this.setState(state => ({
      isVisible: state.isVisible[key]
        ? {}
        : {
            [key]: level,
            ...state.isVisible,
          },
    }))

  toggleMenu = value => this.setState({ isMenu: value, isVisible: {} })

  render() {
    const { children } = this.props
    const { currentTheme, isMenu, isMobile, isVisible } = this.state
    const { toggle, toggleMenu } = this
    const getLevel = (levels, level) =>
      Object.values(levels).some(x => x === level)
    // eslint-disable-next-line no-nested-ternary
    const level = getLevel(isVisible, 'volume')
      ? getLevel(isVisible, 'chapter')
        ? 'chapter'
        : 'volume'
      : 'base'

    return (
      <ThemeProvider theme={themes[currentTheme]}>
        <Global styles={globalStyles} />
        <Provider value={{ isVisible, toggle, toggleMenu }}>
          <Container>
            {isMobile && (
              <MobileMenu
                isMenu={isMenu}
                onClick={() => this.toggleMenu(!isMenu)}
              />
            )}
            {!isMobile && (
              <MenuContainer level={level}>
                <Outlined>
                  <Scrollbars universal>
                    <About />
                    <Consumer>
                      {({ isVisible: isMenuVisible, toggle: menuToggle }) => (
                        <Menu isVisible={isMenuVisible} toggle={menuToggle} />
                      )}
                    </Consumer>
                  </Scrollbars>
                </Outlined>
              </MenuContainer>
            )}
            <MainContainer level={level}>
              <Header />
              <Outlined>
                <Scrollbars ref={this.mainScrollbar} universal>
                  <Content>{children}</Content>
                </Scrollbars>
              </Outlined>
            </MainContainer>
          </Container>
        </Provider>
      </ThemeProvider>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

const withLocation = props => (
  <Location>
    {({ location }) => <Layout location={location} {...props} />}
  </Location>
)

export default withLocation
