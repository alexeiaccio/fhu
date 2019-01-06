import posed from 'react-pose'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Posed = posed.div({
  mobile: {
    width: '100%',
  },
  base: {
    width: '25%',
  },
  volume: {
    width: '33%',
  },
  chapter: {
    width: '66%',
  },
})

const Container = styled(Posed)`
  ${tw([
    'absolute',
    'flex',
    'flex-col',
    'pl-q12',
    'py-q12',
    'pin-b',
    'pin-l',
    'pin-t',
    'md:pl-q24',
    'md:py-q24',
  ])};
  box-sizing: border-box;
`

function MenuContainer({ children, level }) {
  return <Container pose={level}>{children}</Container>
}

MenuContainer.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string.isRequired,
}

export default MenuContainer
