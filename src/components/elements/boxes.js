import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const Box = css`
  ${tw(['items-stretch', 'justify-start', 'relative', 'max-w-full'])};
  outline-offset: -2px;
`

export const SimpleBox = styled.div`
  ${Box};
  ${tw([
    'bg-white',
    'flex',
    'flex-grow',
    'flex-shrink',
    'flex-row',
    'flex-wrap',
    'text-black',
  ])};
  outline: 4px solid ${({ theme }) => theme.color};
  transition: all 200ms ease-in-out;
`

export const FlexBox = styled.div`
  ${Box};
  ${tw([
    'bg-white',
    'flex',
    'flex-grow',
    'flex-shrink',
    'flex-row',
    'flex-wrap',
    'text-black',
    'hover:text-white',
  ])};
  outline: 4px solid ${({ theme }) => theme.color};
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.color};
  }
`

export const InlineBox = styled.span`
  ${Box};
  ${tw(['inline-flex'])};
`

export const Column = styled.div`
  ${tw(['flex', 'flex-col', 'relative', 'max-w-full', 'w-auto'])};
  flex-basis: 0;
  flex: 1 1 auto;
`
