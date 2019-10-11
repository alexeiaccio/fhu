import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { outlinedStyles } from '../layout/outlined'

const hovered = ({ hover, theme }) => css`
  transition: all 200ms ease-in-out;
  opacity: ${hover ? 1 : 0};
  transform: scale(1);
  & svg {
    stroke: ${theme.color};
  }
  &:hover {
    opacity: 1;
    background-color: ${theme.color};
    transform: scale(1.2);
    & svg {
      stroke: #fff;
    }
  }
`

const Box = styled.div`
  ${tw([
    'absolute',
    'bg-white',
    'cursor-pointer',
    'h-q48',
    'pin-r',
    'pin-t',
    'm-q24',
    'w-q48',
  ])};
  ${outlinedStyles};
  ${hovered};

  & svg {
    ${tw(['h-full', 'w-full'])}
    fill: #fff;
  }
`

function FullScreenToggler({ hover, onClick }) {
  return (
    <Box hover={hover} onClick={onClick} title="Toggle fullscreen">
      <svg version="1.1" viewBox="0 0 36 36">
        <g strokeWidth="1px">
          <path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" />
          <path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" />
          <path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" />
          <path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" />
        </g>
      </svg>
    </Box>
  )
}

FullScreenToggler.propTypes = {
  hover: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default FullScreenToggler
