import React from 'react'
import PropTypes from 'prop-types'
import { map, once } from 'crocks'
import { PoseGroup } from 'react-pose'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import uuid from 'uuid/v4'

import Slide from '../elements/slide'
import random from '../../utils/random'

function Slider({ current, items }) {
  const slides = items.filter((_, i) => i === current)
  const key = once(() => uuid())
  return (
    <PoseGroup>
      {map(
        (item, i) => (
          <Slide key={`${key}-${i}`} item={item} />
        ),
        slides
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
