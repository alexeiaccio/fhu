/* global tw */
import posed from 'react-pose'
import styled from '@emotion/styled'

const Posed = posed.div({
  hidden: {
    height: 0,
    width: 0,
    overflow: 'hidden',
    transition: { duration: 400, ease: 'easeInOut' },
  },
  visible: {
    height: 'auto',
    width: 'auto',
    overflow: 'visible',
    transition: { duration: 600, ease: 'easeInOut' },
  },
})

export const Appeared = styled(Posed)`
  ${tw(['flex', 'flex-1'])};
`
