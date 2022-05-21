import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { Helmet } from 'react-helmet'
import posed from 'react-pose'
import { propPathOr } from '../../utils'

const slideStyles = css`
  ${tw([
    'absolute',
    'flex',
    'flex-no-wrap',
    'flex-row',
    'h-full',
    'pin-l',
    'pin-t',
  ])};
`

const Slide = posed.div({
  transform: {
    x: ({ current, length }) => `-${(current * 100) / length}%`,
    transition: { ease: 'easeOut' },
  },
})

const getSrc = image =>
  propPathOr(
    propPathOr(null, ['url'], image),
    ['localFile', 'childImageSharp', 'fluid', 'src'],
    image
  )

const Images = ({ current, items }) => (
  <>
    <Helmet>
      {items.map(({ imagesrc }) => (
        <link
          key={`${imagesrc.url}-preload`}
          rel="preload"
          href={getSrc(imagesrc)}
          as="image"
        />
      ))}
    </Helmet>
    <Slide
      css={css`
        ${slideStyles};
        width: ${items.length * 100}%;
      `}
      pose="transform"
      poseKey={current}
      current={current}
      length={items.length}
    >
      {items.map(({ imagesrc }) => (
        <div
          key={imagesrc.url}
          css={css`
            ${tw([
              'bg-white',
              'bg-center',
              'bg-contain',
              'bg-no-repeat',
              'flex-no-shrink',
              'h-full',
            ])};
            background-image: url(${getSrc(imagesrc)});
            width: ${100 / items.length}%;
          `}
        />
      ))}
    </Slide>
  </>
)

Images.propTypes = {
  current: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(Images)
