/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'

import { uuid } from '../../utils'

export const Posed = posed.div({
  enter: {
    applyAtStart: { display: 'flex' },
    opacity: 1,
  },
  exit: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
  },
})

function Appeared({ children, isVisible }) {
  return (
    <PoseGroup>
      {isVisible && [
        <Posed
          css={css`
            ${tw([
              'cursor-pointer',
              'flex-grow',
              'flex-no-shrink',
              'flex-col',
            ])};
            @media (max-width: 768px) {
              max-width: calc(100% - 2.5rem);
            }
            @media (min-width: 769px) {
              max-width: calc(100% - 2.8rem);
            }
          `}
          key={uuid()}
        >
          {children}
        </Posed>,
      ]}
    </PoseGroup>
  )
}

Appeared.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
}

Appeared.defaultProps = {
  isVisible: null,
}

export default Appeared
