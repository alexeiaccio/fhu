import { css } from '@emotion/core'

export const hovered = ({ theme }) => css`
  ${tw(['bg-white', 'cursor-pointer'])};
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${theme.color};
  }
`

export const hover = css`
  ${tw(['relative'])};
  &::before {
    ${tw(['absolute', 'bg-white', 'opacity-0', 'pin'])};
    content: '';
    transition: opacity 200ms ease-in-out;
  }
  &:hover::before {
    ${tw(['opacity-50'])};
  }
`

export const inHoverStyles = css`
  ${tw(['relative'])};
`
