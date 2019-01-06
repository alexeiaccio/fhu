import React from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

import Title from './title'
import Content from './content'
import Outlined from './outlined'
import Search from './search'

const styles = css`
  ${tw(['flex-no-grow', 'flex-no-shrink', 'relative'])};
`

function Header({ location }) {
  return (
    <Outlined css={styles}>
      <Content>
        <Title location={location} />
        <Search location={location} />
      </Content>
    </Outlined>
  )
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Header
