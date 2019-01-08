import posed from 'react-pose'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Posed = posed.div({
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
  ${tw(['flex', 'flex-grow', 'flex-col'])};
`

function MainContainer({ children, level }) {
  return <Container pose={level}>{children}</Container>
}

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string.isRequired,
}

export default MainContainer
