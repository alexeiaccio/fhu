/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { propPathOr } from 'crocks'
import posed from 'react-pose'

import Img from './img'
import { Content } from './shared'
import { Column } from './boxes'

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

function Slide({ item }) {
  if (!item) return null

  const imgSrc = propPathOr(null, ['image'], item)
  const caption = propPathOr(null, ['caption', 'html'], item)
  const link = propPathOr(null, ['link', 'document', 0], item)
  const title = propPathOr(null, ['data', 'title', 'text'], link)
  const uid = propPathOr(null, ['uid'], link)

  return (
    <Wrapper>
      <Hover>
        <ContentLink
          css={css`
            ${tw(['flex', 'h-full'])};
          `}
          to={`/${uid}`}
        >
          <Column
            css={css`
              ${tw(['h-full', 'items-start'])};
            `}
          >
            <Img className="preview-img" src={imgSrc} />
            <h2
              css={css`
                ${tw(['flex-no-grow', 'my-q16'])};
              `}
            >
              {title}
            </h2>
            <div
              css={css`
                ${tw(['flex-no-grow'])};
              `}
              dangerouslySetInnerHTML={{ __html: caption }} // eslint-disable-line react/no-danger
            />
          </Column>
        </ContentLink>
      </Hover>
      <Img src={imgSrc} />
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
