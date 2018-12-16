import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { chain, compose, map, option, prop, propPathOr } from 'crocks'
import Seo from '../seo/seo'

const Layout = ({ children, ...props }) => {
  const pageDataKey = compose(
    option('nope'),
    chain(prop(0)),
    map(Object.keys),
    prop('data')
  )(props)
  const pageData = propPathOr(null, ['data', pageDataKey, 'data'], props)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['seodescription'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(
    null,
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    pageData
  )
  const pathname = propPathOr('/', ['location', 'pathname'], props)

  return (
    <Fragment>
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <div>{children}</div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
