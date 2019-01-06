import posed from 'react-pose'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Posed = posed.div({
  mobile: {
    width: '100%',
  },
  base: {
    width: '75%',
  },
  volume: {
    width: '67%',
  },
  chapter: {
    width: '34%',
  },
})

const Container = styled(Posed)`
  ${tw([
    'absolute',
    'flex',
    'flex-col',
    'pr-q12',
    'py-q12',
    'pin-b',
    'pin-r',
    'pin-t',
    'md:pr-q24',
    'md:py-q24',
  ])};
  box-sizing: border-box;
`

function MainContainer({ children, level }) {
  return <Container pose={level}>{children}</Container>
}

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string.isRequired,
}

export default MainContainer
