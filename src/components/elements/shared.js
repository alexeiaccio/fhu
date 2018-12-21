/* global tw */
import styled from '@emotion/styled'

import { Box } from './boxes'

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

export const Container = styled.div`
  ${tw([
    'flex',
    'flex-row',
    'flex-no-grow',
    'h-screen',
    'items-start',
    'p-q24',
    'w-screen',
  ])};
  box-sizing: border-box;
`

export const MainContent = styled.div`
  ${Box};
  ${tw(['flex', 'flex-col', 'max-h-full', 'min-w-1/2'])};
  flex: 10 1 0%;
  outline: 4px solid ${({ theme }) => theme.color};
`

export const MenuContainer = styled.div`
  ${Box};
  ${tw([
    'flex',
    'flex-col',
    'h-full',
    'items-stretch',
    'justify-start',
    'max-w-1/2',
    'min-w-1/4',
  ])};
  outline: 4px solid ${({ theme }) => theme.color};
`
