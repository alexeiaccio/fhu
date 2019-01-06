import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const Hovered = ({ theme }) => css`
  &:hover {
    background-color: ${theme.color};
  }
`

export const Box = css`
  ${tw(['items-stretch', 'justify-start', 'relative', 'max-w-full'])};
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
  transition: all 200ms ease-in-out;
`

export const FlexBox = styled.div`
  ${Box};
  ${Hovered};
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
  transition: all 200ms ease-in-out;
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
