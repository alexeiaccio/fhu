/* global tw */
import posed from 'react-pose'
import styled from '@emotion/styled'

const Posed = posed.div({
  visible: {
    height: 'auto',
    width: 'auto',
    overflow: 'visible',
    transition: { duration: 600, ease: 'easeInOut' },
  },
  hidden: {
    height: 0,
    width: 0,
    overflow: 'hidden',
    transition: { duration: 400, ease: 'easeInOut' },
  },
})

export const Appeared = styled(Posed)`
  ${tw(['cursor-pointer', 'flex', 'flex-1'])};
`
