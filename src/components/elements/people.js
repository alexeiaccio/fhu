import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import uuid from 'uuid/v4'
import { propPathOr } from 'crocks'

const Wrapper = styled.ul`
  ${tw(['flex', 'flex-row', 'flex-wrap', 'mb-q24'])};
`

const Li = styled.li`
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
    <Wrapper>
      {items.map(({ link }) => {
        const uid = propPathOr(null, ['document', 0, 'uid'], link)
        const title = propPathOr(
          null,
          ['document', 0, 'data', 'title', 'text'],
          link
        )
        return (
          <Li key={uuid()}>{uid && <Link to={`/${uid}`}>{title}</Link>}</Li>
        )
      })}
    </Wrapper>
  )
}

People.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default People
