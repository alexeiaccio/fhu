import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { Box } from './boxes'

export const Outlined = ({ theme }) => css`
  outline: 4px solid ${theme.color};
  outline-offset: -2px;
`

export const TextContent = styled.div`
  ${tw([
    'cursor-pointer',
    'flex-no-grow',
    'px-q12',
    'py-q8',
    'whitespace-no-wrap',
    'md:px-q24',
    'md:py-q12',
  ])};
  &::before {
    ${tw(['absolute', 'block', 'pin'])};
    content: '';
  }
`

export const Content = styled.div`
  ${tw(['flex-1', 'p-q12', 'md:p-q24'])};
  box-sizing: border-box;
`

export const Container = styled.div`
  ${tw([
    'flex',
    'flex-row',
    'flex-no-grow',
    'h-screen',
    'items-start',
    'p-q8',
    'w-screen',
    'md:p-q24',
  ])};
  box-sizing: border-box;
`

const getLevel = (levels, level) => Object.values(levels).some(x => x === level)

const MainWidth = ({ levels }) => css`
  @media (min-width: 769px) {
    flex-basis: 75%;
    flex-basis: ${getLevel(levels, 'volume') && '66%'};
    flex-basis: ${getLevel(levels, 'volume') &&
      getLevel(levels, 'chapter') &&
      '50%'};
  }
`

export const MainContent = styled.div`
  ${Box};
  ${Outlined};
  ${tw(['flex', 'flex-1', 'flex-col', 'h-full', 'min-w-1/2'])};
  ${MainWidth};
`

const MenuWidth = ({ levels }) => css`
  @media (min-width: 769px) {
    flex-basis: 25%;
    flex-basis: ${getLevel(levels, 'volume') && '34%'};
    flex-basis: ${getLevel(levels, 'volume') &&
      getLevel(levels, 'chapter') &&
      '50%'};
  }
`

export const MenuContainer = styled.div`
  ${Box};
  ${Outlined};
  ${tw([
    'flex',
    'flex-col',
    'h-full',
    'items-stretch',
    'justify-start',
    'md:flex-1',
    'md:max-w-1/2',
    'md:min-w-1/4',
  ])};
  ${MenuWidth};
  box-sizing: border-box;
  padding: 2px 0;
  @media (max-width: 768px) {
    min-width: 2.5rem;
  }
`

export const MobileContainer = styled.div`
  ${tw(['flex', 'flex-row', 'md:hidden'])};
`
