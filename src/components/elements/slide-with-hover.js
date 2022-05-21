import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import posed from 'react-pose'
import { propPathOr } from '../../utils'
import { Column, FlexBox } from './boxes'
import Img from './img'
import RichContent from './rich-content'
import { Content } from './shared'

const Transition = posed.div({
  enter: {
    animateOnMount: true,
    opacity: 1,
    transition: { duration: 600 },
  },
  exit: {
    opacity: 0,
    delay: 800,
    transition: { duration: 400 },
  },
})

const transitionStyles = css`
  ${tw(['md:absolute', 'md:max-w-full', 'md:overflow-hidden', 'md:pin'])};
`

const imageWrapperStyles = css`
  ${tw(['pb-2/3', 'relative', 'w-full', 'md:absolute', 'md:pin', 'md:p-0'])};
  & .slide-image {
    ${tw(['pin', 'md:m-q24'])};
  }
`

const Posed = posed.div({
  hoverable: true,
  init: {
    opacity: 0,
    y: 20,
  },
  hover: {
    delay: 400,
    opacity: 1,
    y: 0,
  },
})

const Hover = styled(Posed)`
  ${tw(['absolute', 'pin-b', 'pin-l', 'pin-r', 'z-10'])};
  & .preview-img {
    ${tw(['flex-1', 'w-2/3'])};
  }
`

const ContentLink = Content.withComponent(Link)
const ButtonLink = FlexBox.withComponent(Link)

function Slide({ item, ...props }) {
  if (!item) return null

  const imgSrc = propPathOr(null, ['image'], item)
  const caption = propPathOr(null, ['caption', 'html'], item)
  const link = propPathOr(null, ['link', 'document'], item)
  const title = propPathOr(null, ['data', 'title', 'text'], link)
  const uid = propPathOr(null, ['uid'], link)

  const renderDescription = () => [
    title && (
      <h2
        css={css`
          ${tw(['flex-no-grow', 'mb-q16'])};
        `}
        key={title}
      >
        {title}
      </h2>
    ),
    caption && (
      <RichContent
        css={css`
          ${tw(['flex-no-grow'])};
        `}
        content={caption}
        key={caption}
      />
    ),
  ]

  return (
    <Transition css={transitionStyles} {...props}>
      <Hover
        css={css`
          ${tw(['hidden', 'md:block'])};
        `}
      >
        <ContentLink
          css={css`
            ${tw(['bg-fuchsia', 'flex'])};
            color: white !important;
          `}
          to={uid ? `/${uid}` : '/'}
        >
          <Column
            css={css`
              ${tw(['items-start'])};
            `}
          >
            {renderDescription()}
          </Column>
        </ContentLink>
      </Hover>
      <div css={imageWrapperStyles}>
        <Img
          className="slide-image"
          src={imgSrc}
          style={{ position: 'absolute' }}
        />
      </div>
      <Content
        css={css`
          ${tw(['flex', 'flex-col', 'md:hidden'])};
        `}
      >
        {renderDescription()}
        {uid && (
          <ButtonLink
            css={css`
              ${tw(['mt-q24'])};
            `}
            to={`/${uid}`}
          >
            <Content>Read more →</Content>
          </ButtonLink>
        )}
      </Content>
    </Transition>
  )
}

Slide.propTypes = {
  item: PropTypes.objectOf(PropTypes.object),
}

Slide.defaultProps = {
  item: null,
}

export default Slide
