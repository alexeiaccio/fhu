import React, { useContext } from 'react'
import posed from 'react-pose'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { MenuContext } from './context'

const Posed = posed.div({
  mobile: {
    width: '100%',
    maxWidth: '100%',
  },
  closed: {
    width: '0%',
    maxWidth: '0%',
  },
  base: {
    width: '25%',
    maxWidth: '25%',
  },
  volume: {
    width: '33%',
    maxWidth: '480px',
  },
  chapter: {
    width: '66%',
    maxWidth: '640px',
  },
})

const Container = styled(Posed)`
  ${tw([
    'bg-white',
    'flex',
    'flex-grow',
    'flex-col',
    'md:absolute',
    'md:min-w-1/4',
    'md:pin-b',
    'md:pin-l',
    'md:pin-t',
    'md:z-50',
  ])};
`

const poseStyles = ({ pose }) => `
  @media (min-width: 768px) {
    display: ${pose !== 'base' ? 'block' : 'none'};
    opacity: ${pose !== 'base' ? 0.24 : 0};
  }
`

const Fade = styled.div`
  ${tw(['absolute', 'bg-white', 'cursor-pointer', 'hidden', 'pin', 'z-40'])};
  ${poseStyles};
  transition: opacity 200ms ease-in-out;
`

function MenuContainer({ children, level }) {
  const { toggleMenu } = useContext(MenuContext)
  return (
    <>
      <Fade onClick={() => toggleMenu(false)} pose={level} title="Close menu" />
      <Container pose={level}>{children}</Container>
    </>
  )
}

MenuContainer.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string.isRequired,
}

export default MenuContainer
