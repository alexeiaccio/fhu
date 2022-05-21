import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { PoseGroup } from 'react-pose'
import { propPathOr, uuid } from '../../utils'
import random from '../../utils/random'
import Slide from '../elements/slide-with-hover'

class Slider extends Component {
  constructor() {
    super()
    this.state = {
      current: [],
    }
  }

  componentDidMount() {
    this.randomize(this.props.items.length - 1)
    this.randomizer = setInterval(() => {
      this.randomize(this.props.items.length - 1)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.randomizer)
    this.randomizer = null
  }

  randomize = length => {
    const makeRandom = random(length)
    this.setState(state => ({
      current: []
        .concat(
          state.current.some(x => x === makeRandom)
            ? random(length)
            : makeRandom
        )
        .concat(state.current)
        .slice(0, 2),
    }))
  }

  render() {
    const { items } = this.props
    const { current } = this.state

    return (
      <>
        <Helmet>
          {items.map(item => {
            const imgSrc = propPathOr(
              null,
              ['image', 'localFile', 'childImageSharp', 'fluid', 'src'],
              item
            )
            return <link key={uuid} rel="preload" href={imgSrc} as="image" />
          })}
        </Helmet>
        <PoseGroup>
          {items.map((item, idx) =>
            current[0] === idx ? (
              <Slide key={`slider-${idx}`} item={item} /> // eslint-disable-line
            ) : null
          )}
        </PoseGroup>
      </>
    )
  }
}

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

Slider.defaultProps = {
  items: [],
}

export default Slider
