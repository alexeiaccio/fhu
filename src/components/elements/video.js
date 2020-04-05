/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'

import { propPathOr } from '../../utils'
import RichContent from './rich-content'

function Video({ primary }) {
  if (!primary) return null

  const videoContent = propPathOr(null, ['link', 'html'], primary)

  return (
    <RichContent
      css={css`
        ${tw(['flex', 'justify-center', 'max-w-md', 'my-q48', 'w-full'])};
      `}
      content={videoContent}
    />
  )
}

Video.propTypes = {
  primary: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default Video
