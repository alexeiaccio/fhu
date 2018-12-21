/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import styled from '@emotion/styled'
import uuid from 'uuid/v4'

import Img from './img'

const Slide = styled.div`
  ${tw(['relative'])};
`

function Slider({ current, items, next, previous }) {
  return (
    <Slide onClick={next} onKeyUp={previous}>
      {items.map(({ imagesrc }, idx) =>
        idx === current ? <Img key={uuid()} src={imagesrc} /> : null
      )}
    </Slide>
  )
}

Slider.propTypes = {
  current: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
}

export default withStateHandlers(({ init = 0 }) => ({ current: init }), {
  next: ({ current, items }) => () => ({
    current: (current + 1) % items.length,
  }),
  previous: ({ current, items }) => () => ({
    current: (current - 1) % items.length,
  }),
})(Slider)
