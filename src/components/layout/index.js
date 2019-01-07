import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Scrollbars } from 'react-custom-scrollbars'

import About from './about'
import Content from './content'
import Container from './container'
import globalStyles from './global-styles'
import Header from './header'
import MainContainer from './main-container'
import Menu from './menu'
import MenuContainer from './menu-container'
import Outlined from './outlined'
import themes from './themes'
import { Provider, Consumer } from './context'

import '../fonts/stylesheet.css'

const mainContainerStyles = css`
  padding: 2px;
`

class Layout extends Component {
  constructor() {
    super()
    this.mainScrollbar = createRef()
    this.state = {
      currentTheme: 'fuchsia',
      // isMenu: false,
      isVisible: {},
    }
  }

  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.changeTheme('fuchsia')
    } else {
      this.changeTheme('teal')
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

  toggleMenu = () => this.setState({ isVisible: {} })

  render() {
    const { children, location } = this.props
    const { currentTheme, isVisible } = this.state
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
        <Container>
          <MenuContainer level={level}>
            <Outlined>
              <Scrollbars universal>
                <About />
                <Provider value={{ isVisible, toggle, toggleMenu }}>
                  <Consumer>
                    {({ isVisible: isMenuVisible, toggle: menuToggle }) => (
                      <Menu isVisible={isMenuVisible} toggle={menuToggle} />
                    )}
                  </Consumer>
                </Provider>
              </Scrollbars>
            </Outlined>
          </MenuContainer>
          <MainContainer css={mainContainerStyles} level={level}>
            <Header location={location} />
            <Outlined>
              <Scrollbars ref={this.mainScrollbar} universal>
                <Content>{children}</Content>
              </Scrollbars>
            </Outlined>
          </MainContainer>
        </Container>
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

export default Layout
