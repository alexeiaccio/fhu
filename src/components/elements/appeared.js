/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import uuid from 'uuid/v4'

export const Posed = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 600, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 400, ease: 'easeInOut' },
  },
})

function Appeared({ children, isVisible }) {
  return (
    <PoseGroup>
      {isVisible && (
        <Posed
          css={css`
            ${tw(['cursor-pointer', 'flex', 'flex-1'])};
            max-width: calc(100% - 3.25rem);
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
