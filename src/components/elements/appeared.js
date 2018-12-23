/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import uuid from 'uuid/v4'

export const Posed = posed.div({
  enter: {
    applyAtStart: { display: 'flex' },
    height: 'auto',
    opacity: 1,
    overflow: 'visible',
    width: 'auto',
  },
  exit: {
    applyAtEnd: { display: 'none' },
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    width: 0,
  },
})

function Appeared({ children, isVisible }) {
  return (
    <PoseGroup>
      {isVisible && (
        <Posed
          css={css`
            ${tw(['cursor-pointer', 'flex-1'])};
            @media (max-width: 768px) {
              max-width: calc(100% - 2.5rem);
            }
            @media (min-width: 769px) {
              max-width: calc(100% - 3.25rem);
            }
          `}
          key={uuid()}
        >
          {children}
        </Posed>
      )}
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
