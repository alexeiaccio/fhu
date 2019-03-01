import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import posed from 'react-pose'
import { spring, value } from 'popmotion'
import styled from '@emotion/styled'

import Bullets from './bullets'
import Images from './slider-images'
import { propPathOr } from '../../utils'
import RichContent from './rich-content'

const sliderStyles = css`
  ${tw(['overflow-hidden', 'relative'])};
  max-height: 66.66666vh;
  padding-bottom: 66.66666%;
`

const wrapperStyles = css`
  ${tw(['absolute', 'pin'])};
`

const Draggable = posed.div({
  draggable: 'x',
  dragEnd: {
    transition: ({ from, to, velocity }) =>
      spring({ from, to, velocity, stiffness: 250, damping: 50 }),
  },
})

const poseStyles = ({ pose }) => `
  left:${pose === 'right' ? 'auto' : 0};
  right:${pose === 'right' ? 0 : 'auto'};
  transform: translateX(${pose === 'right' ? '100%' : '-100%'});
`

const Arrow = styled.div`
  ${tw([
    'absolute',
    'cursor-pointer',
    'hidden',
    'items-center',
    'justify-center',
    'opacity-25',
    'pin-b',
    'pin-t',
    'text-black',
    'w-q24',
    'hover:opacity-100',
    'md:flex',
  ])};
  ${poseStyles};
  transition: opacity 200ms ease-in-out;
`

class Slider extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor() {
    super()
    this.state = {
      current: 0,
      clientX: null,
    }
    this.x = value(0)
  }

  handleDragStart = e => {
    const { clientX } = propPathOr(e, ['touches', 0], e)
    this.setState({ clientX })
  }

  handleDragEnd = e => {
    const { items } = this.props
    const { clientX: oldClientX, current } = this.state
    const { clientX: newClientX } = propPathOr(e, ['changedTouches', 0], e)

    if (current + 1 < items.length && newClientX - oldClientX < -30) {
      this.setState({ current: current + 1 })
    } else if (current > 0 && newClientX - oldClientX > 30) {
      this.setState({ current: current - 1 })
    }
    this.setState({ clientX: null })
  }

  to = number => {
    this.setState({ current: number })
  }

  render() {
    const { items } = this.props
    if (!items) return null

    const { current, clientX } = this.state
    const valuesMap = { x: this.x }

    const caption = propPathOr(null, [current, 'caption'], items)

    return (
      <>
        <div
          css={css`
            ${tw(['relative'])};
          `}
        >
          <div css={sliderStyles}>
            <Draggable
              css={css`
                ${wrapperStyles};
                cursor: ${clientX ? 'grabbing' : 'grab'};
              `}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
              values={valuesMap}
            >
              <Images current={current} items={items} />
            </Draggable>
          </div>
          <Arrow
            onClick={() => this.to((current - 1) % items.length)}
            pose="left"
          >
            <span>◀︎</span>
          </Arrow>
          <Arrow
            onClick={() => this.to((current + 1) % items.length)}
            pose="right"
          >
            <span>▶︎</span>
          </Arrow>
        </div>
        {caption && (
          <RichContent
            css={css`
              ${tw(['my-q12'])};
            `}
            content={caption.html}
          />
        )}
        <Bullets active={current} length={items.length} onClick={this.to} />
      </>
    )
  }
}

export default Slider
