import React, { useEffect, useMemo, useRef, useState } from 'react'
import { css } from '@emotion/core'
import posed from 'react-pose'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { equals, map, propPathOr, uuid } from '../../utils'
import Media from '../elements/media'
import { outlinedStyles } from '../layout/outlined'
import People from '../elements/people'
import Related from '../elements/related'
import Slider from '../elements/slider'
import RichContent from '../elements/rich-content'
import { RichText, RichTextSmall } from '../elements/rich-text'
import Video from '../elements/video'

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
    'w-100',
    'md:w-1/2',
  ])};
  ${outlinedStyles};
  ${hovered};
`

const articleStyles = css`
  ${tw(['py-q24', 'max-w-md', 'relative', 'w-full'])};
  margin: 0 auto;
  &::after {
    ${tw(['absolute', 'block', 'pin-b', 'pin-l', 'pin-r'])};
    content: '';
    height: 50px;
  }
`

const leadStyles = css`
  ${RichText};
  ${tw(['mb-q24'])};
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
  ${tw(['mb-q24'])};
`

const textStyles = css`
  ${RichText};
  ${tw(['mb-q24'])};
`

const rightStyles = css`
  ${RichText};
  ${tw(['mb-q24'])};
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
  ${tw(['mb-q24'])};
  & > * {
    ${tw(['text-center'])};
  }
`

function TextBody({ body, truncated }) {
  if (!body) return null
  const articleContentRef = useRef(null)
  const [isOpened, setOpened] = useState(null)

  useEffect(() => {
    if (articleContentRef.current && truncated) {
      setOpened(articleContentRef.current.getBoundingClientRect().height < 480)
    }
  }, [])

  return useMemo(
    () => (
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
            {map(({ __typename, items, primary }) => {
              const textContent = propPathOr(null, ['text', 'html'], primary)

              return (
                <section key={uuid()}>
                  {equals(__typename, 'PrismicTextBodyDescription') && (
                    <RichContent
                      content={textContent}
                      css={descriptionStyles}
                      key={uuid()}
                    />
                  )}
                  {equals(__typename, 'PrismicTextBodyLead') && (
                    <RichContent
                      content={textContent}
                      css={leadStyles}
                      key={uuid()}
                    />
                  )}
                  {equals(__typename, 'PrismicTextBodyText') && (
                    <RichContent
                      content={textContent}
                      css={textStyles}
                      key={uuid()}
                    />
                  )}
                  {equals(__typename, 'PrismicTextBodyRighted') && (
                    <RichContent
                      content={textContent}
                      css={rightStyles}
                      key={uuid()}
                    />
                  )}
                  {equals(__typename, 'PrismicTextBodyCentered') && (
                    <RichContent
                      content={textContent}
                      css={centerStyles}
                      key={uuid()}
                    />
                  )}
                  {equals(__typename, 'PrismicTextBodyPeople') && (
                    <People key={uuid()} items={items} />
                  )}
                  {equals(__typename, 'PrismicTextBodyImage') && (
                    <Slider key={uuid()} items={items} />
                  )}
                  {equals(__typename, 'PrismicTextBodyMedia') && (
                    <Media key={uuid()} items={items} />
                  )}
                  {equals(__typename, 'PrismicTextBodyVideo') && (
                    <Video key={uuid()} primary={primary} />
                  )}
                  {equals(__typename, 'PrismicTextBodyRelated') && (
                    <aside>
                      <Related key={uuid()} items={items} />
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
    ),
    [isOpened]
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
