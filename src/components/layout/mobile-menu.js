import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import About from './about'
import Content from './content'
import Menu from './menu'
import MenuContainer from './menu-container'
import Outlined from './outlined'
import { MenuContext } from './context'
import Scrollbars from './scrollbars'

const opener = ({ isMenu }) => css`
  ${isMenu && tw(['absolute', 'pin', 'z-50'])};
`

const Container = styled.div`
  ${tw(['bg-white', 'flex', 'flex-row', 'flex-no-wrap'])};
  ${opener};
  box-sizing: border-box;
`

const moduleMenuStyles = css`
  ${tw(['cursor-pointer', 'font-extrabold'])};
`

function MobileMenu({ isMenu, onClick }) {
  const { isVisible: isMenuVisible, toggle: menuToggle } = useContext(
    MenuContext
  )
  return (
    <Container isMenu={isMenu}>
      <MenuContainer level={isMenu ? 'mobile' : 'closed'}>
        <Outlined>
          <Scrollbars>
            <About />
            <Menu isVisible={isMenuVisible} toggle={menuToggle} />
          </Scrollbars>
        </Outlined>
      </MenuContainer>
      <Outlined onClick={onClick} css={moduleMenuStyles}>
        <Outlined>
          <Content>F</Content>
        </Outlined>
        <Outlined>
          <Content>H</Content>
        </Outlined>
        <Outlined>
          <Content>U</Content>
        </Outlined>
      </Outlined>
    </Container>
  )
}

MobileMenu.propTypes = {
  isMenu: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MobileMenu
