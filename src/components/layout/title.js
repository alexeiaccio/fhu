import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { StaticQuery, Link, graphql } from 'gatsby'

import { compose, filter, isNil, map, not, propPathOr } from '../../utils'
import random from '../../utils/random'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      current: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const items = propPathOr(
        [],
        ['slider', 'edges', 0, 'node', 'items'],
        this.props
      )
      this.randomize(items.length - 1)
    }
  }

  randomize = length => {
    this.setState({ current: random(length) })
  }

  render() {
    const { homepage, slider } = this.props
    const defaultTitle = propPathOr(null, ['data', 'title', 'text'], homepage)
    const sliderItems = compose(
      filter(not(isNil)),
      map(propPathOr(null, ['caption', 'text'])),
      propPathOr([], ['edges', 0, 'node', 'items'])
    )(slider)
    const currentTitle = propPathOr(
      defaultTitle,
      [this.state.current],
      sliderItems
    )

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
}

Title.propTypes = {
  homepage: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  slider: PropTypes.objectOf(PropTypes.array).isRequired,
}

const withStaticQuery = props => (
  <StaticQuery
    query={graphql`
      query {
        homepage: prismicHomepage {
          data {
            title {
              text
            }
          }
        }
        slider: allPrismicHomepageBodySlider(
          filter: { primary: { sliderid: { eq: "titles" } } }
        ) {
          edges {
            node {
              items {
                caption {
                  text
                }
              }
            }
          }
        }
      }
    `}
    render={({ homepage, slider }) => (
      <Title homepage={homepage} slider={slider} {...props} />
    )}
  />
)

export default withStaticQuery
