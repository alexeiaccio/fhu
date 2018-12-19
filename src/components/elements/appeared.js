/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import uuid from 'uuid/v4'

const Posed = posed.div({
  enter: {
    height: 'auto',
    width: 'auto',
    overflow: 'visible',
    transition: { duration: 600, ease: 'easeInOut' },
  },
  exit: {
    height: 0,
    width: 0,
    overflow: 'hidden',
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
