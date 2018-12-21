import React from 'react'
import PropTypes from 'prop-types'

const RichContent = ({ content, ...props }) =>
  content ? (
    <div dangerouslySetInnerHTML={{ __html: content }} {...props} />
  ) : null // eslint-disable-line react/no-danger

RichContent.propTypes = {
  content: PropTypes.string.isRequired,
}

export default RichContent