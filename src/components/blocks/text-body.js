/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'

import { equals, map, propPathOr, uuid } from '../../utils'
import Media from '../elements/media'
import People from '../elements/people'
import Related from '../elements/related'
import Slider from '../elements/slider'
import RichContent from '../elements/rich-content'
import { RichText, RichTextSmall } from '../elements/rich-text'
import Video from '../elements/video'

const articleStyles = css`
  ${tw(['py-q24', 'w-full'])};
  margin: 0 auto;
  max-width: 40rem;
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
  & p {
    ${tw(['text-right'])};
  }
`

const centerStyles = css`
  ${RichText};
  ${tw(['mb-q24'])};
  & p {
    ${tw(['text-center'])};
  }
`

function TextBody({ body }) {
  if (!body) return null

  return (
    <article css={articleStyles}>
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
    </article>
  )
}

TextBody.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TextBody
