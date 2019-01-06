/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'

import { uuid } from '../../utils'

const wrapperStyles = css`
  ${tw(['flex', 'flex-row', 'flex-no-wrap'])};
`

const liStyles = css`
  ${tw([
    'bg-teal',
    'font-semibold',
    'inline-flex',
    'ml-q16',
    'px-q12',
    'relative',
    'text-xs',
    'text-white',
  ])};
  line-height: 1.4rem;
  &::after {
    ${tw([
      'absolute',
      'bg-teal',
      'flex',
      'font-extrabold',
      'h-q16',
      'items-center',
      'justify-center',
      'pin-l',
      'pin-t',
      'text-white',
      'w-q16',
    ])};
    content: '•';
    transform: translate3d(-50%, 20%, 0) rotateZ(45deg);
  }
`

function Tags({ tags, ...props }) {
  if (!tags) return null

  return (
    <ul css={wrapperStyles} {...props}>
      {tags.map(tag => (
        <li css={liStyles} key={uuid()}>
          {tag}
        </li>
      ))}
    </ul>
  )
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Tags
