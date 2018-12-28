/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'

import { uuid } from '../../utils'

const wrapperStyles = css`
  ${tw(['mt-q24', 'px-q20'])};
  box-sizing: border-box;
`

const headingStyles = css`
  ${tw(['font-medium', 'text-lg'])};
`

const videoStyles = css`
  ${tw(['h-q40', 'mt-q12', 'w-full'])};
`

function Media({ items }) {
  if (!items) return null

  return (
    <div>
      {items.map(({ link }) => (
        <div css={wrapperStyles} key={uuid()}>
          {link.name && (
            <h5 css={headingStyles}>{link.name.replace(/\..+$/, '')}</h5>
          )}
          {link.url && (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
            <video css={videoStyles} controls="controls">
              <source src={link.url} type="video/mp4" />
              <track label={link.name || ''} src={link.url} />
            </video>
          )}
        </div>
      ))}
    </div>
  )
}

Media.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Media
