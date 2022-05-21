/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { uuid } from '../../utils'

const Active = ({ active }) => css`
  ${active ? tw(['bg-fuchsia']) : tw(['bg-grey', 'cursor-pointer'])};
`

const Bullet = styled.button`
  ${tw([
    'block',
    'border-none',
    'h-q8',
    'outline-none',
    'rounded-full',
    'w-q8',
  ])};
  &:not(:last-of-type) {
    ${tw(['mr-q12'])};
  }
  ${Active};
`

function Bullets({ active, length, onClick }) {
  const [keys] = useState(() => Array.from({ length }, () => uuid()))

  if (length < 2) return null

  return (
    <div
      css={css`
        ${tw([
          'flex',
          'flex-row',
          'flex-no-wrap',
          'justify-center',
          'mb-q24',
          'mt-q12',
          'w-full',
        ])};
      `}
    >
      {Array(length)
        .fill(null)
        .map((_, idx) => (
          <Bullet
            active={idx === active}
            key={keys[idx]}
            onClick={() => (idx !== active ? onClick(idx) : null)}
            type="button"
          >
            &nbsp;
          </Bullet>
        ))}
    </div>
  )
}

Bullets.propTypes = {
  active: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Bullets
