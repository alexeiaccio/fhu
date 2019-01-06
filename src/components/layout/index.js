import React from 'react'
import PropTypes from 'prop-types'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Scrollbars } from 'react-custom-scrollbars'

import Content from './content'
import globalStyles from './global-styles'
// import Header from './header'
import MainContainer from './main-container'
import MenuContainer from './menu-container'
import Outlined from './outlined'
import themes from './themes'
import '../fonts/stylesheet.css'

function Layout({ children }) {
  return (
    <ThemeProvider theme={themes.teal}>
      <Global styles={globalStyles} />
      <MenuContainer level="base">
        <Outlined>Menu</Outlined>
      </MenuContainer>
      <MainContainer level="base">
        {/* <Header location={location}/> */}
        <Outlined>
          <Scrollbars universal>
            <Content>{children}</Content>
          </Scrollbars>
        </Outlined>
      </MainContainer>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Layout
