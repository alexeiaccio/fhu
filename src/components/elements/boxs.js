/* global tw */
import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const Box = css`
  ${tw(['items-center', 'justify-start', 'max-w-full'])};
  outline: 4px solid pink;
  outline-offset: -2px;
`

export const FlexBox = styled.div`
  ${Box};
  ${tw(['flex', 'flex-grow'])};
`

export const InlineBox = styled.span`
  ${Box};
  ${tw(['inline-flex'])};
`

export const Column = styled.div`
  ${tw(['flex', 'flex-col', 'max-w-1/2'])};
`
