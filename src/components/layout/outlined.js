import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const outlinedStyles = ({ theme }) => css`
  outline: 4px solid ${theme.color};
  outline-offset: -2px;
`

export default styled.div`
  ${tw(['flex-1', 'w-full'])};
  ${outlinedStyles};
  box-sizing: border-box;
`
