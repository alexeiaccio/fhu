/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { propPathOr } from '../../utils'

const wrapperStyles = css`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'mb-q24', 'max-w-md', 'w-full'])};
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
        const uid = propPathOr(null, ['document', 'uid'], link)
        const title = propPathOr(
          null,
          ['document', 'data', 'title', 'text'],
          link
        )
        return (
          Boolean(uid) && (
            <li css={liStyles} key={uid}>
              <Link to={`/${uid}`}>{title}</Link>
            </li>
          )
        )
      })}
    </div>
  )
}

People.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default People
