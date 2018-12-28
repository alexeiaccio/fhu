/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'

import { uuid } from '../../utils'
import Img from './img'
import Bullets from './bullets'

const slideStyles = css`
  ${tw(['relative'])};
  & .slide-image {
    max-height: 66.66666vh;
  }
`

function Slider({ current, items, next, to }) {
  if (!items) return null

  return (
    <div>
      <div
        css={slideStyles}
        onClick={items.length > 1 ? next : null}
        onKeyUp={items.length > 1 ? next : null}
      >
        {items.map(({ imagesrc }, idx) =>
          idx === current ? (
            <Img
              className="slide-image"
              key={uuid()}
              imgStyle={{ objectFit: 'contain' }}
              src={imagesrc}
            />
          ) : null
        )}
      </div>
      <Bullets active={current} length={items.length} onClick={to} />
    </div>
  )
}

Slider.propTypes = {
  current: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  next: PropTypes.func.isRequired,
  to: PropTypes.func.isRequired,
}

export default withStateHandlers(({ init = 0 }) => ({ current: init }), {
  next: ({ current }, props) => () => ({
    current: (current + 1) % props.items.length,
  }),
  previous: ({ current }, props) => () => ({
    current: (current - 1) % props.items.length,
  }),
  to: () => value => ({ current: value }),
})(Slider)
