/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import uuid from 'uuid/v4'

export const Posed = posed.div({
  enter: {
    height: 'auto',
    opacity: 1,
    overflow: 'visible',
    width: 'auto',
  },
  exit: {
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
