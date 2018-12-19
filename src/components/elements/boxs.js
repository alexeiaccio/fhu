/* global tw */
import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const Box = css`
  ${tw(['items-start', 'justify-start', 'max-w-full'])};
  outline: 4px solid fuchsia;
  outline-offset: -2px;
`

export const FlexBox = styled.div`
  ${Box};
  ${tw(['flex', 'flex-grow', 'flex-shrink', 'flex-row'])};
`

export const InlineBox = styled.span`
  ${Box};
  ${tw(['inline-flex'])};
`

export const Column = styled.div`
  ${tw(['flex', 'flex-col', 'flex-grow', 'flex-shrink', 'max-w-full'])};
`
