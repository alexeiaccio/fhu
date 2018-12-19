/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import GatsbyImg from 'gatsby-image'
import { propPathOr } from 'crocks'

function Img({ src, ...props }) {
  const fluid = propPathOr(null, ['localFile', 'childImageSharp', 'fluid'], src)
  const url = propPathOr(null, ['url'], src)
  if (!fluid) {
    if (!url) return null

    return <img src={url} alt="" />
  }
  return <GatsbyImg fluid={fluid} {...props} />
}

Img.propTypes = {
  src: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
}

export default Img
