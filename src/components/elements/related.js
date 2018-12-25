import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import uuid from 'uuid/v4'
import { propPathOr } from 'crocks'
import Img from './img'

const H2 = styled.h2`
  ${tw(['font-semibold', 'mt-q24', 'text-xxl'])};
`

const Wrapper = styled.ul`
  ${tw(['flex', 'flex-row', 'flex-wrap'])};
  margin: 0.75rem -0.5rem 0;
`

const Li = styled.li`
  ${tw(['flex', 'max-w-1/2', 'px-q8', 'py-1', 'text-xs'])};
`

const Card = styled.div`
  ${tw(['bg-teal-lighter', 'p-q8'])};
`

const H3 = styled.h3`
  ${tw(['font-semibold', 'mt-q8'])};
`

function Related({ items }) {
  if (!items) return null

  return (
    <>
      <H2>Related</H2>
      <Wrapper>
        {items.map(({ link }) => {
          const uid = propPathOr(null, ['document', 0, 'uid'], link)
          const title = propPathOr(
            null,
            ['document', 0, 'data', 'title', 'text'],
            link
          )
          const src = propPathOr(null, ['document', 0, 'data', 'image'], link)
          return (
            <Li key={uuid()}>
              {uid && (
                <Link to={`/${uid}`}>
                  <Card>
                    <Img src={src} />
                    <H3>{title}</H3>
                  </Card>
                </Link>
              )}
            </Li>
          )
        })}
      </Wrapper>
    </>
  )
}

Related.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Related
