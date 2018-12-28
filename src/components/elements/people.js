/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { propPathOr, uuid } from '../../utils'

const wrapperStyles = css`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'mb-q24'])};
`

const liStyles = css`
  ${tw([
    'bg-teal-lighter',
    'font-semibold',
    'inline-flex',
    'mr-q8',
    'px-q8',
    'py-1',
    'text-xs',
  ])};
`

function People({ items }) {
  if (!items) return null

  return (
    <div css={wrapperStyles}>
      {items.map(({ link }) => {
        const uid = propPathOr(null, ['document', 0, 'uid'], link)
        const title = propPathOr(
          null,
          ['document', 0, 'data', 'title', 'text'],
          link
        )
        return (
          <li css={liStyles} key={uuid()}>
            {uid && <Link to={`/${uid}`}>{title}</Link>}
          </li>
        )
      })}
    </div>
  )
}

People.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default People
