/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { propPathOr } from 'crocks'
import posed from 'react-pose'
import uuid from 'uuid/v4'

import { Column, FlexBox } from './boxes'
import Img from './img'
import { Content } from './shared'
import RichContent from './rich-content'

const Transition = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 600 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 600 },
  },
})

const Wrapper = styled(Transition)`
  ${tw(['relative'])};
`

const Posed = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    opacity: 0,
    scale: 1,
  },
  hover: {
    opacity: 1,
    scale: 1.02,
  },
  press: {
    scale: 1.01,
  },
})

const Hover = styled(Posed)`
  ${tw(['absolute', 'pin', 'text-white', 'z-10'])};
  background-color: ${({ theme }) => theme.color};
  & .preview-img {
    ${tw(['flex-1', 'w-2/3'])};
  }
`

const ContentLink = Content.withComponent(Link)
const ButtonLink = FlexBox.withComponent(Link)

function Slide({ item }) {
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
    <Wrapper>
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
      <Img src={imgSrc} />
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
    </Wrapper>
  )
}

Slide.propTypes = {
  item: PropTypes.objectOf(PropTypes.object),
}

Slide.defaultProps = {
  item: null,
}

export default Slide
