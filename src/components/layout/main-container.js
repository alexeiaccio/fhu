import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const poseStyles = ({ pose }) => `
  filter: blur(${pose !== 'base' ? 4 : 0}px);
  &::after {
    display: ${pose !== 'base' ? 'block' : 'none'};
    opacity: ${pose !== 'base' ? 0.24 : 0};
  }
`

const Container = styled.div`
  ${tw([
    'flex',
    'flex-grow',
    'flex-col',
    'w-3/4',
    'md:absolute',
    'md:pin-b',
    'md:pin-r',
    'md:pin-t',
  ])};
  transition: filter 0ms linear 200ms;
  ${poseStyles};
`

function MainContainer({ children, level }) {
  return <Container pose={level}>{children}</Container>
}

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string.isRequired,
}

export default MainContainer
