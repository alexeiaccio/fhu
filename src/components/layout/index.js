import { Global } from '@emotion/core'
import { Location } from '@reach/router'
import { ThemeProvider } from 'emotion-theming'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../fonts/stylesheet.css'
import About from './about'
import Container from './container'
import Content from './content'
import { Provider } from './context'
import globalStyles from './global-styles'
import Header from './header'
import Links from './links'
import MainContainer from './main-container'
import Menu from './menu'
import MenuContainer from './menu-container'
import MobileMenu from './mobile-menu'
import Outlined from './outlined'
import Scrollbars from './scrollbars'
import themes from './themes'

class Layout extends Component {
  constructor() {
    super()
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
    const { children, onIndex } = this.props
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
          <Container id="modal-root">
            {isMobile && (
              <MobileMenu
                isMenu={isMenu}
                onClick={() => this.toggleMenu(!isMenu)}
              />
            )}
            {!isMobile && (
              <MenuContainer level={level}>
                <Outlined>
                  <Scrollbars>
                    <About />
                    <Menu isVisible={isVisible} toggle={toggle} />
                  </Scrollbars>
                </Outlined>
              </MenuContainer>
            )}
            <MainContainer level={level}>
              <Header />
              <Outlined>
                <Scrollbars>
                  <Content>{children}</Content>
                </Scrollbars>
              </Outlined>
              {onIndex && <Links />}
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
  onIndex: PropTypes.bool,
}

Layout.defaultProps = {
  onIndex: false,
}

const withLocation = props => (
  <Location>
    {({ location }) => <Layout location={location} {...props} />}
  </Location>
)

export default withLocation
