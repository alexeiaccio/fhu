/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
// import uuid from 'uuid/v4'

function Slider({ items }) {
  console.log(items)

  return <div>poop</div>
}

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

Slider.defaultProps = {
  items: [],
}

export default Slider
