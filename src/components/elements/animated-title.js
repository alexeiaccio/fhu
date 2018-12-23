/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { lifecycle } from 'recompose'
import { compose, filter, isNil, map, not, propPathOr } from 'crocks'

import { Box } from './boxes'
import { withRandomState } from './recomposed'

const ContentLink = styled(Link)`
  ${Box};
  ${tw(['flex-no-grow', 'p-q12', 'md:p-q24'])};
  box-sizing: border-box;
  border-bottom: 4px solid ${({ theme }) => theme.color};
`

function AnimatedTitle({ current, home, slider }) {
  const defaultTitle = propPathOr(null, ['data', 'title', 'text'], home)
  const sliderItems = compose(
    filter(not(isNil)),
    map(propPathOr(null, ['caption', 'text'])),
    propPathOr([], ['edges', 0, 'node', 'items'])
  )(slider)
  const currentTitle = propPathOr(defaultTitle, [current], sliderItems)

  return (
    <ContentLink to="/">
      <h1
        css={css`
          ${tw(['font-extrabold', 'text-3xl', 'w-full'])};
        `}
      >
        {currentTitle}
      </h1>
    </ContentLink>
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
        this.props.randomize(items.length)
      }
    },
  })
)(AnimatedTitle)
