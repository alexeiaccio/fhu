import { css } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import posed from 'react-pose'
import { equals, map, propPathOr, uuid } from '../../utils'
import Media from '../elements/media'
import People from '../elements/people'
import Related from '../elements/related'
import RichContent from '../elements/rich-content'
import { RichText, RichTextSmall } from '../elements/rich-text'
import Slider from '../elements/slider'
import Video from '../elements/video'
import { outlinedStyles } from '../layout/outlined'

const Truncate = posed.div({
  closed: {
    applyAtStart: { overflow: 'hidden' },
    height: '360px',
  },
  opened: {
    applyAtEnd: { overflow: 'visible' },
    height: 'auto',
  },
})

const hovered = ({ theme }) => css`
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${theme.color};
  }
`

const StyledLink = styled.button`
  ${tw([
    'bg-white',
    'block',
    'border-none',
    'cursor-pointer',
    'font-medium',
    'my-q24',
    'mx-auto',
    'p-q12',
    'text-lg',
    'w-q120',
  ])};
  ${outlinedStyles};
  ${hovered};
`

const articleStyles = css`
  ${tw(['py-q24', 'relative', 'w-full'])};
  margin: 0 auto;
  &::after {
    ${tw(['absolute', 'block', 'pin-b', 'pin-l', 'pin-r'])};
    content: '';
    height: 50px;
  }
`

const leadStyles = css`
  ${RichText};
  ${tw(['max-w-md', 'mb-q12', 'w-full'])};
  &:not(:last-child) {
    ${tw(['mb-q24'])};
  }
  & p {
    ${tw(['text-xl'])};
  }
  & ul,
  & ol {
    ${tw(['text-body'])};
  }
`

const descriptionStyles = css`
  ${RichTextSmall};
  ${tw(['max-w-md', 'mb-q24', 'w-full'])};
`

const textStyles = css`
  ${RichText};
  ${tw(['max-w-md', 'mb-q12', 'w-full'])};
  &:not(:last-child) {
    ${tw(['mb-q24'])};
  }
`

const rightStyles = css`
  ${RichText};
  ${tw(['max-w-md', 'mb-q24', 'w-full'])};
  & > * {
    ${tw(['text-right'])};
  }
  & ul > li::before,
  & ol > li::before {
    content: none;
  }
  & ul > li::after {
    content: '';
    ${tw([
      'bg-teal',
      'inline-block',
      'h-q8',
      'ml-q12',
      'pin-l',
      'pin-t',
      'rounded-full',
      'w-q8',
    ])};
    top: 0.65rem;
  }
  & ol > li::after {
    content: counter(li);
    counter-increment: li;
    ${tw(['inline-block', 'ml-q12'])};
  }
`

const centerStyles = css`
  ${RichText};
  ${tw(['max-w-md', 'mb-q24', 'w-full'])};
  & > * {
    ${tw(['text-center'])};
  }
`

function TextBody({ body, truncated }) {
  if (!body) return null
  const articleContentRef = useRef(null)
  const [isOpened, setOpened] = useState(null)
  const [keys] = useState(() => Array.from(body, () => uuid()))

  useEffect(() => {
    if (truncated) {
      if (articleContentRef.current) {
        setOpened(
          articleContentRef.current.getBoundingClientRect().height < 480
        )
      }
    } else {
      setOpened(true)
    }
  }, [])

  return (
    <>
      <Truncate
        css={css`
          ${articleStyles};
          &::after {
            background: ${!isOpened &&
              'linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))'};
          }
        `}
        pose={isOpened ? 'opened' : 'closed'}
      >
        <div ref={articleContentRef}>
          {map(({ __typename, items, primary, slice_label: label }, idx) => {
            const textContent = propPathOr(null, ['text', 'html'], primary)

            return (
              <section
                key={keys[idx]}
                css={css`
                  ${tw(['flex', 'flex-col', 'items-center', 'justify-start'])};
                `}
              >
                {equals(__typename, 'PrismicTextBodyDescription') && (
                  <RichContent content={textContent} css={descriptionStyles} />
                )}
                {equals(__typename, 'PrismicTextBodyLead') && (
                  <RichContent content={textContent} css={leadStyles} />
                )}
                {equals(__typename, 'PrismicTextBodyText') && (
                  <RichContent content={textContent} css={textStyles} />
                )}
                {equals(__typename, 'PrismicTextBodyRighted') && (
                  <RichContent content={textContent} css={rightStyles} />
                )}
                {equals(__typename, 'PrismicTextBodyCentered') && (
                  <RichContent content={textContent} css={centerStyles} />
                )}
                {equals(__typename, 'PrismicTextBodyPeople') && (
                  <People items={items} />
                )}
                {equals(__typename, 'PrismicTextBodyImage') && (
                  <Slider label={label} items={items} />
                )}
                {equals(__typename, 'PrismicTextBodyMedia') && (
                  <Media items={items} />
                )}
                {equals(__typename, 'PrismicTextBodyVideo') && (
                  <Video primary={primary} />
                )}
                {equals(__typename, 'PrismicTextBodyRelated') && (
                  <aside
                    css={css`
                      ${tw(['max-w-md', 'w-full'])}
                    `}
                  >
                    <Related items={items} />
                  </aside>
                )}
              </section>
            )
          }, body)}
        </div>
      </Truncate>
      {!isOpened && (
        <StyledLink onClick={() => setOpened(true)}>More ↓</StyledLink>
      )}
    </>
  )
}

TextBody.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  truncated: PropTypes.bool,
}

TextBody.defaultProps = {
  truncated: false,
}

export default TextBody
