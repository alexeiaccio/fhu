import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Scrollbars } from 'react-custom-scrollbars'
import { Location } from '@reach/router'

const containerStyle = css`
  ${tw(['h-full', 'relative', 'w-full'])};
`

const getThemeColor = theme =>
  theme.color === '#ff00ff' ? '255, 0, 255' : '77, 192, 181'

const shadowStyles = ({
  position,
  shadowTopOpacity,
  shadowBottomOpacity,
  theme,
}) => css`
  ${position === 'top' ? tw(['pin-t']) : tw(['pin-b'])};
  background: linear-gradient(
    to ${position === 'top' ? 'bottom' : 'top'},
    rgba(${getThemeColor(theme)}, 0.5) 0%,
    rgba(${getThemeColor(theme)}, 0) 100%
  );
  opacity: ${position === 'top' ? shadowTopOpacity : shadowBottomOpacity};
`

const Shadow = styled.div`
  ${tw(['absolute', 'h-q12', 'pin-l', 'pin-r'])};
  ${shadowStyles};
`

class ShadowScrollbars extends Component {
  constructor(props, ...rest) {
    super(props, ...rest)
    this.scrollbars = createRef()
    this.shadowTop = createRef()
    this.shadowBottom = createRef()
    this.state = {
      shadowTopOpacity: 0,
      shadowBottomOpacity: 1,
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      this.scrollbars.current
    ) {
      this.scrollbars.current.scrollTop()
    }
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight } = values
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20)
    const bottomScrollTop = scrollHeight - clientHeight
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
    this.setState({ shadowBottomOpacity, shadowTopOpacity })
  }

  render() {
    const { shadowBottomOpacity, shadowTopOpacity } = this.state
    return (
      <div css={containerStyle}>
        <Scrollbars
          ref={this.scrollbars}
          onUpdate={this.handleUpdate}
          universal
        >
          {this.props.children}
        </Scrollbars>
        <Shadow
          ref={this.shadowTop}
          position="top"
          shadowTopOpacity={shadowTopOpacity}
        />
        <Shadow
          ref={this.shadowBottom}
          position="bottom"
          shadowBottomOpacity={shadowBottomOpacity}
        />
      </div>
    )
  }
}

ShadowScrollbars.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

const withLocation = props => (
  <Location>
    {({ location }) => <ShadowScrollbars location={location} {...props} />}
  </Location>
)

export default withLocation
