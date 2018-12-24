/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { equals, map, propPathOr } from 'crocks'
import uuid from 'uuid/v4'

import Media from '../elements/media'
import Slider from '../elements/slider'
import RichContent from '../elements/rich-content'
import { RichText } from '../elements/rich-text'
import Video from '../elements/video'

const articleStyles = css`
  ${tw(['py-q24'])};
`

const textStyles = css`
  ${RichText}
`

function TextBody({ body }) {
  if (!body) return null

  return (
    <article css={articleStyles}>
      {map(({ __typename, items, primary }) => {
        const textContent = propPathOr(null, ['text', 'html'], primary)

        return (
          <section key={uuid()}>
            {equals(__typename, 'PrismicTextBodyText') && (
              <RichContent
                content={textContent}
                css={textStyles}
                key={uuid()}
              />
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
          </section>
        )
      }, body)}
    </article>
  )
}

TextBody.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TextBody
