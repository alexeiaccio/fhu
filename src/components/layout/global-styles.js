import { css } from '@emotion/core'

export default css`
  html {
    ${tw(['font-sans'])};
  }
  * {
    ${tw(['m-0', 'p-0'])};
  }
  a {
    ${tw(['no-underline'])};
    color: inherit;
    &:hover,
    &:active,
    &:focus {
      color: inherit;
    }
  }
  ul,
  li {
    ${tw(['list-reset'])};
  }
`
