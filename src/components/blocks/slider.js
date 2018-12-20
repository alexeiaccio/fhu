import React from 'react'
import PropTypes from 'prop-types'
import { PoseGroup } from 'react-pose'
import { compose, lifecycle, withStateHandlers } from 'recompose'

import Slide from '../elements/slide'
import random from '../../utils/random'

function Slider({ current, items }) {
  // const key = once(() => uuid())
  return (
    <PoseGroup>
      {items.map((item, idx) =>
        idx === current ? <Slide key={item} item={item} /> : null
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
  withStateHandlers(
    ({ init = 0 }) => ({
      current: init,
    }),
    {
      randomize: () => value => ({ current: random(value) }),
    }
  ),
  lifecycle({
    componentDidMount() {
      this.ranomizer = setInterval(() => {
        this.props.randomize(this.props.items.length)
      }, 4000)
    },
    componentWillUnmount() {
      clearInterval(this.ranomizer)
      this.ranomizer = null
    },
  })
)(Slider)
