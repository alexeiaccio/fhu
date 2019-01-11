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
  ${tw(['py-q24', 'max-w-md', 'w-full'])};
  margin: 0 auto;
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

function TextBody({ body }) {
  if (!body) return null

  return (
    <div css={articleStyles}>
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
  )
}

TextBody.propTypes = {
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TextBody
