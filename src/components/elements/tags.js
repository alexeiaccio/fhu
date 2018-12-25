import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import uuid from 'uuid/v4'

const Wrapper = styled.ul`
  ${tw(['flex', 'flex-row', 'flex-no-wrap'])};
`

const Li = styled.li`
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
  line-height: 1.375rem;
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
    <Wrapper {...props}>
      {tags.map(tag => (
        <Li key={uuid()}>{tag}</Li>
      ))}
    </Wrapper>
  )
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Tags
