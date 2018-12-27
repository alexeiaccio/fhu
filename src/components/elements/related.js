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
  ${tw(['flex', 'flex-1', 'max-w-1/2', 'px-q8', 'py-1', 'text-xs'])};
`
const StyledLink = styled(Link)`
  ${tw(['w-full'])};
`
const Card = styled.div`
  ${tw(['bg-teal-lighter', 'p-q8'])};
  box-sizing: border-box;
`

const H3 = styled.h3`
  ${tw(['font-semibold', 'mt-q8'])};
`

function Related({ items }) {
  if (!items || !items.length) return null

  return (
    <>
      <H2>Related</H2>
      <Wrapper>
        {items.map(item => {
          const correctPath = propPathOr(item, ['link', 'document', 0], item)
          const uid = propPathOr(null, ['uid'], correctPath)
          const title = propPathOr(null, ['data', 'title', 'text'], correctPath)
          const image = propPathOr(null, ['data', 'image'], correctPath)

          return (
            <Li key={uuid()}>
              {uid && (
                <StyledLink to={`/${uid}`}>
                  <Card>
                    <Img src={image} />
                    <H3>{title}</H3>
                  </Card>
                </StyledLink>
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
