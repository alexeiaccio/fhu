/* global tw */
import styled from '@emotion/styled'

export const TextContent = styled.span`
  ${tw([
    'cursor-pointer',
    'flex-no-grow',
    'px-q24',
    'py-q12',
    'whitespace-no-wrap',
  ])};
`

export const Content = styled.div`
  ${tw(['flex-1', 'p-q24'])};
`
