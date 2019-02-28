import React from 'react'
import posed from 'react-pose'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Consumer } from './context'

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
    maxWidth: '320px',
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
    'md:pin-b',
    'md:pin-l',
    'md:pin-t',
    'md:z-50',
  ])};
`

const poseStyles = ({ pose }) => `
  display: ${pose !== 'base' ? 'block' : 'none'};
  opacity: ${pose !== 'base' ? 0.24 : 0};
`

const Fade = styled.div`
  ${tw(['absolute', 'bg-white', 'cursor-pointer', 'pin', 'z-40'])};
  ${poseStyles};
  transition: opacity 200ms ease-in-out;
`

function MenuContainer({ children, level }) {
  return (
    <Consumer>
      {({ toggleMenu }) => (
        <>
          <Fade onClick={toggleMenu} pose={level} title="Close menu" />
          <Container pose={level}>{children}</Container>
        </>
      )}
    </Consumer>
  )
}

MenuContainer.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string.isRequired,
}

export default MenuContainer
