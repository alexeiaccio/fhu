import { css } from '@emotion/core'

export default ({ theme }) => css`
  ${tw(['bg-white', 'cursor-pointer'])};
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${theme.color};
  }
`
