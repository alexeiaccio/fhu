/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { equals, map, propPathOr } from 'crocks'
import uuid from 'uuid/v4'

import RichContent from '../elements/rich-content'
import Slider from '../elements/slider'
import { RichText } from '../elements/rich-text'

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
          <section>
            {equals(__typename, 'PrismicTextBodyText') && (
              <RichContent content={textContent} css={textStyles} key={uuid} />
            )}
            {equals(__typename, 'PrismicTextBodyImage') && (
              <Slider key={uuid} items={items} />
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
