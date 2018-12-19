/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { propPathOr } from 'crocks'
import posed, { PoseGroup } from 'react-pose'
import uuid from 'uuid/v4'

import Img from '../elements/img'
import { withHover } from '../elements/recomposed'
import { Content } from '../elements/shared'
import { Column } from '../elements/boxs'

const Wrapper = styled.div`
  ${tw(['relative'])};
`

const Posed = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 400, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 200, ease: 'easeInOut' },
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

function Slider({ isVisible, items, toggle }) {
  const imgSrc = propPathOr(null, [0, 'image'], items)
  const caption = propPathOr(null, [0, 'caption', 'html'], items)
  const link = propPathOr(null, [0, 'link', 'document', 0], items)
  const title = propPathOr(null, ['data', 'title', 'text'], link)
  const uid = propPathOr(null, ['uid'], link)

  return (
    <Wrapper>
      <PoseGroup>
        {isVisible && (
          <Hover
            key={uuid()}
            onMouseLeave={() => toggle(false)}
            onBlur={() => toggle(false)}
          >
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
        )}
      </PoseGroup>
      <div onMouseEnter={() => toggle(true)} onFocus={() => toggle(true)}>
        <Img src={imgSrc} />
      </div>
    </Wrapper>
  )
}

Slider.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func.isRequired,
}

Slider.defaultProps = {
  items: [],
}

export default withHover(Slider)
