/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'

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
  ${({ active }) =>
    active ? tw(['bg-fuchsia']) : tw(['bg-grey', 'cursor-pointer'])};
`

function Bullets({ active, length, onClick }) {
  if (length < 2) return null

  return (
    <div
      css={css`
        ${tw([
          'flex',
          'flex-row',
          'flex-no-wrap',
          'justify-center',
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
            key={uuid()}
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
