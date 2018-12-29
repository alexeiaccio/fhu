import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const Outlined = ({ theme }) => css`
  outline: 4px solid ${theme.color};
  outline-offset: -2px;
`
export const OutlinedContainer = styled.div`
  ${tw(['flex-1', 'w-full'])};
  ${Outlined};
  box-sizing: border-box;
  padding: 2px 0;
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

const getLevel = (levels, level) => Object.values(levels).some(x => x === level)

const BlurContent = ({ levels }) => css`
  filter: blur(${getLevel(levels, 'volume') ? 4 : 0}px);
  &::after {
    ${getLevel(levels, 'volume') &&
      tw([
        'absolute',
        'bg-white',
        'cursor-pointer',
        'opacity-25',
        'pin',
        'z-40',
      ])};
    content: '';
  }
`

export const MainContent = styled.div`
  ${tw([
    'absolute',
    'flex',
    'flex-col',
    'h-full',
    'pr-q12',
    'py-q12',
    'pin-r',
    'pin-t',
    'md:pr-q24',
    'md:py-q24',
    'md:w-3/4',
  ])};
  ${BlurContent};
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: calc(100% - 3.3rem);
  }
`

const MenuWidth = ({ levels }) => css`
  ${tw(['md:w-1/4'])};
  ${getLevel(levels, 'volume') && tw(['md:max-w-sm', 'md:w-1/2'])};
  ${getLevel(levels, 'volume') &&
    getLevel(levels, 'chapter') &&
    tw(['md:max-w-md', 'md:w-2/3'])};
`

export const MenuContainer = styled.div`
  ${tw([
    'absolute',
    'flex',
    'flex-col',
    'h-full',
    'items-stretch',
    'justify-start',
    'pl-q12',
    'py-q12',
    'pin-l',
    'pin-t',
    'z-50',
    'md:pl-q24',
    'md:py-q24',
  ])};
  ${MenuWidth};
  box-sizing: border-box;
  @media (max-width: 768px) {
    min-width: 3.3rem;
  }
`

export const MobileContainer = styled.div`
  ${tw(['flex', 'flex-row', 'md:hidden'])};
  @media (max-width: 768px) {
    margin-top: -2px;
  }
`
