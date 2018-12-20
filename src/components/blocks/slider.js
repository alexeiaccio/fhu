/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { propPathOr } from 'crocks'
import posed from 'react-pose'

import Img from '../elements/img'
import { Content } from '../elements/shared'
import { Column } from '../elements/boxes'

const Wrapper = styled.div`
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

function Slider({ items }) {
  const imgSrc = propPathOr(null, [0, 'image'], items)
  const caption = propPathOr(null, [0, 'caption', 'html'], items)
  const link = propPathOr(null, [0, 'link', 'document', 0], items)
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

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

Slider.defaultProps = {
  items: [],
}

export default Slider
