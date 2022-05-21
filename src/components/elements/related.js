/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { propPathOr } from '../../utils'
import Img from './img'

const headingStyles = css`
  ${tw(['font-semibold', 'mt-q24', 'text-xxl'])};
`

const wrapperStyles = css`
  ${tw(['flex', 'flex-row', 'flex-wrap'])};
  margin: 0.75rem -0.5rem 0;
`

const liStyles = css`
  ${tw(['flex', 'flex-1', 'max-w-1/2', 'px-q8', 'py-1', 'text-xs'])};
`
const linkStyles = css`
  ${tw(['w-full'])};
`
const cardStyles = css`
  ${tw(['bg-teal-lighter', 'p-q8'])};
  box-sizing: border-box;
`

const titleStyles = css`
  ${tw(['font-semibold', 'mt-q8'])};
`

function Related({ items }) {
  if (!items || !items.length) return null

  return [
    <h2 key="related" css={headingStyles}>
      Related
    </h2>,
    <div key="items" css={wrapperStyles}>
      {items.map(item => {
        const correctPath = propPathOr(item, ['link', 'document'], item)
        const uid = propPathOr(null, ['uid'], correctPath)
        const title = propPathOr(null, ['data', 'title', 'text'], correctPath)
        const image = propPathOr(null, ['data', 'image'], correctPath)

        return (
          <li css={liStyles} key={uid}>
            {uid && (
              <Link css={linkStyles} to={`/${uid}`}>
                <div css={cardStyles}>
                  <Img src={image} />
                  <h3 css={titleStyles}>{title}</h3>
                </div>
              </Link>
            )}
          </li>
        )
      })}
    </div>,
  ]
}

Related.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Related
