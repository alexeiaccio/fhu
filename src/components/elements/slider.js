import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import posed from 'react-pose'
import { spring, value } from 'popmotion'
import styled from '@emotion/styled'

import Bullets from './bullets'
import FullScreenToggler from './full-screen'
import Images from './slider-images'
import Modal from './modal'
import { propPathOr } from '../../utils'
import RichContent from './rich-content'

const togglerStyles = css`
  &:hover > .fullsreen-toggler {
    opacity: 1;
  }
`

const sliderStyles = css`
  ${tw(['overflow-hidden', 'relative'])};
  max-height: 66.66666vh;
  padding-bottom: 66.66666%;
  ${togglerStyles};
`

const fullsreenStyles = css`
  ${tw(['absolute', 'overflow-hidden', 'pin'])};
  ${togglerStyles};
`

const wrapperStyles = css`
  ${tw(['absolute', 'pin'])};
`

const Draggable = posed.div({
  draggable: 'x',
  dragEnd: {
    x: 0,
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
      hover: false,
      fullsreen: false,
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
    const { items } = this.props

    if (number < 0) {
      this.setState({ current: items.length - 1 })
    } else if (number > items.length - 1) {
      this.setState({ current: 0 })
    } else {
      this.setState({ current: number })
    }
  }

  handleOver = hover => {
    if (hover !== this.state.hover) {
      this.setState({ hover })
    }
  }

  handleClick = () => {
    this.setState(({ fullsreen }) => ({ fullsreen: !fullsreen }))
  }

  render() {
    const { items } = this.props
    if (!items || !items.length) return null

    const { current, clientX, hover, fullsreen } = this.state
    const valuesMap = { x: this.x }
    const isSlider = items.length > 1
    const caption = propPathOr(null, [current, 'caption'], items)

    const renderContent = () => (
      <>
        <div
          /* eslint-disable-next-line */
          onMouseOver={() => this.handleOver(true)}
          onFocus={() => this.handleOver(true)}
          onMouseLeave={() => this.handleOver(false)}
          css={fullsreen ? fullsreenStyles : sliderStyles}
        >
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
        {isSlider && (
          <>
            <Arrow onClick={() => this.to(current - 1)} pose="left">
              <span>◀︎</span>
            </Arrow>
            <Arrow onClick={() => this.to(current + 1)} pose="right">
              <span>▶︎</span>
            </Arrow>
          </>
        )}
        <FullScreenToggler
          hover={hover && !clientX}
          onClick={this.handleClick}
        />
      </>
    )

    return (
      <>
        {fullsreen ? (
          <Modal>
            <div
              css={css`
                ${tw([
                  'absolute',
                  'bg-white',
                  'flex',
                  'flex-col',
                  'items-center',
                  'justify-center',
                  'pin',
                ])};
                z-index: 100;
              `}
              id="modal"
            >
              <div
                css={css`
                  ${tw(['flex-1', 'w-full'])};
                `}
              >
                {renderContent()}
              </div>
              <div
                css={css`
                  ${tw(['flex-no-shrink', 'relative'])};
                `}
              >
                <Bullets
                  active={current}
                  length={items.length}
                  onClick={this.to}
                />
              </div>
            </div>
          </Modal>
        ) : (
          <div
            css={css`
              ${tw(['relative'])};
            `}
          >
            {renderContent()}
          </div>
        )}
        {caption && (
          <RichContent
            css={css`
              ${tw(['my-q12', 'font-semibold', 'text-xs'])};
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
