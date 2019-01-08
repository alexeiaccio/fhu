import React from 'react'
import { css } from '@emotion/core'

import Title from './title'
import Content from './content'
import Outlined from './outlined'
import Search from './search'

const styles = css`
  ${tw(['flex-no-grow', 'flex-no-shrink', 'relative'])};
`

function Header() {
  return (
    <Outlined css={styles}>
      <Content>
        <Title />
        <Search />
      </Content>
    </Outlined>
  )
}

export default Header
