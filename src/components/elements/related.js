/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { propPathOr, uuid } from '../../utils'
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
    <h2 key={uuid()} css={headingStyles}>
      Related
    </h2>,
    <div key={uuid()} css={wrapperStyles}>
      {items.map(item => {
        const correctPath = propPathOr(item, ['link', 'document', 0], item)
        const uid = propPathOr(null, ['uid'], correctPath)
        const title = propPathOr(null, ['data', 'title', 'text'], correctPath)
        const image = propPathOr(null, ['data', 'image'], correctPath)

        return (
          <li css={liStyles} key={uuid()}>
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
