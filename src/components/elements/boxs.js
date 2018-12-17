/* global tw */
import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const Box = css`
  ${tw(['items-center', 'justify-start'])};
  outline: 4px solid pink;
  outline-offset: -2px;
`

export const FlexBox = styled.div`
  ${Box};
  ${tw(['flex', 'flex-grow', 'flex-no-shrink'])};
`

export const InlineBox = styled.span`
  ${Box};
  ${tw(['inline-flex'])};
`
