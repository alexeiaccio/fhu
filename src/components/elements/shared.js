/* global tw */
import styled from '@emotion/styled'

export const TextContent = styled.div`
  ${tw([
    'cursor-pointer',
    'flex-no-grow',
    'px-q24',
    'py-q12',
    'whitespace-no-wrap',
  ])};
  &::before {
    ${tw(['absolute', 'block', 'pin'])};
    content: '';
  }
`

export const Content = styled.div`
  ${tw(['flex-1', 'p-q24'])};
  box-sizing: border-box;
`
