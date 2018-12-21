/* global tw */
import { css } from '@emotion/core'

import {
  Body,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  List,
} from './typography'

export const Headers = css`
  & h2 {
    ${Heading2};
  }
  & h3 {
    ${Heading3};
  }
  & h4 {
    ${Heading4};
  }
`

export const RichText = css`
  ${Body};
  & h2 {
    ${Heading2};
    ${tw(['my-q36', 'md:mb-q48'])};
  }
  & h3 {
    ${Heading3};
    ${tw(['my-q24', 'md:mb-q36'])};
  }
  & h4 {
    ${Heading4};
    ${tw(['my-q16', 'md:mb-q24'])};
  }
  & p {
    ${tw(['leading-tight', 'mb-q16', 'md:mb-q24', 'text-justify'])};
  }
  & strong {
    ${tw(['font-bold', 'tracking-wide'])};
  }
  & ul {
    ${List};
    ${tw(['my-q48'])};
  }
  & li {
    ${tw(['mb-q12', 'pl-q32', 'relative'])};
  }
  & ul > li::after {
    content: '';
    ${tw(['absolute', 'bg-black', 'block', 'h-q8', 'pin-l', 'pin-t', 'w-q8'])};
    top: 0.625rem;
  }
`

export const RichTextSmall = css`
  ${List};
  & h2 {
    ${Heading3};
    ${tw(['mb-q32', 'md:mb-q36'])};
  }
  & h3 {
    ${Heading4};
    ${tw(['mb-q24', 'md:mb-q32'])};
  }
  & h4 {
    ${Heading5};
    ${tw(['mb-q16', 'md:mb-q24'])};
  }
  & ul {
    ${List};
    ${tw(['my-q48'])};
  }
  & li {
    ${tw(['mb-q12', 'pl-q32', 'relative'])};
  }
  & ul > li::after {
    content: '';
    ${tw(['absolute', 'bg-black', 'block', 'h-q8', 'pin-l', 'pin-t', 'w-q8'])};
    top: 0.625rem;
  }
`
