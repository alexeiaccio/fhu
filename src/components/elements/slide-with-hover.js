/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import posed from 'react-pose'

import { propPathOr, uuid } from '../../utils'
import { Column, FlexBox, Hovered } from './boxes'
import Img from './img'
import { Content } from './shared'
import RichContent from './rich-content'

const Transition = posed.div({
  enter: {
    animateOnMount: true,
    opacity: 1,
    transition: { duration: 600 },
    x: 0,
  },
  exit: {
    opacity: 0,
    delay: 800,
    transition: { duration: 400 },
    x: ({ current, idx }) => current === idx && 24,
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
  },
  hover: {
    opacity: 1,
  },
})

const Hover = styled(Posed)`
  ${tw(['absolute', 'pin', 'text-white', 'z-10'])};
  ${Hovered};
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
  const link = propPathOr(null, ['link', 'document', 0], item)
  const title = propPathOr(null, ['data', 'title', 'text'], link)
  const uid = propPathOr(null, ['uid'], link)

  const renderDescription = () => [
    title && (
      <h2
        css={css`
          ${tw(['flex-no-grow', 'my-q16'])};
        `}
        key={uuid()}
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
        key={uuid()}
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
            ${tw(['flex', 'h-full'])};
          `}
          to={uid ? `/${uid}` : '/'}
        >
          <Column
            css={css`
              ${tw(['h-full', 'items-start'])};
            `}
          >
            <Img className="preview-img" src={imgSrc} />
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
