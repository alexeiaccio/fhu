/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { lifecycle } from 'recompose'
import { compose, filter, isNil, map, not, propPathOr } from 'crocks'

import { withRandomState } from './recomposed'

function AnimatedTitle({ current, home, slider }) {
  const defaultTitle = propPathOr(null, ['data', 'title', 'text'], home)
  const sliderItems = compose(
    filter(not(isNil)),
    map(propPathOr(null, ['caption', 'text'])),
    propPathOr([], ['edges', 0, 'node', 'items'])
  )(slider)
  const currentTitle = propPathOr(defaultTitle, [current], sliderItems)

  return (
    <Link to="/">
      <h1
        css={css`
          ${tw(['font-extrabold', 'text-3xl'])};
        `}
      >
        {currentTitle}
      </h1>
    </Link>
  )
}

AnimatedTitle.propTypes = {
  current: PropTypes.number.isRequired,
  home: PropTypes.objectOf(PropTypes.objectOf),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  slider: PropTypes.objectOf(PropTypes.array),
}

AnimatedTitle.defaultProps = {
  home: null,
  slider: null,
}

export default compose(
  withRandomState,
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        const items = propPathOr(
          [],
          ['slider', 'edges', 0, 'node', 'items'],
          this.props
        )
        this.props.randomize(items.length - 1)
      }
    },
  })
)(AnimatedTitle)
