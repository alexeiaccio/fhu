/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { PoseGroup } from 'react-pose'
import { compose, lifecycle } from 'recompose'

import Slide from '../elements/slide-with-hover'
import { withRandomState } from '../elements/recomposed'

function Slider({ current, items }) {
  return (
    <PoseGroup current={current}>
      {items.map((item, idx) =>
        idx === current ? (
          <Slide key={`slider-${idx}`} item={item} idx={idx} /> // eslint-disable-line
        ) : null
      )}
    </PoseGroup>
  )
}

Slider.propTypes = {
  current: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
}

Slider.defaultProps = {
  current: 0,
  items: [],
}

export default compose(
  withRandomState,
  lifecycle({
    componentDidMount() {
      this.ranomizer = setInterval(() => {
        this.props.randomize(this.props.items.length - 1)
      }, 6000)
    },
    componentWillUnmount() {
      clearInterval(this.ranomizer)
      this.ranomizer = null
    },
  })
)(Slider)
