import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import PropTypes from 'prop-types'
import React from 'react'

import '../fonts/stylesheet.css'

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

const themes = {
  fuchsia: {
    color: '#ff00ff',
  },
  teal: {
    color: '#4dc0b5',
  },
}

function Layout({ children }) {
  return (
    <ThemeProvider theme={themes.teal}>
      <Global styles={globalStyles} />
      <div>{children}</div>
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
