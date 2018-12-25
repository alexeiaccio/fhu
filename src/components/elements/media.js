import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import uuid from 'uuid/v4'

const Wrapper = styled.div`
  ${tw(['mt-q24', 'px-q20'])};
  box-sizing: border-box;
`

const H5 = styled.h5`
  ${tw(['font-medium', 'text-lg'])};
`

const Video = styled.video`
  ${tw(['h-q40', 'mt-q12', 'w-full'])};
`

function Media({ items }) {
  if (!items) return null

  return (
    <>
      <div>
        {items.map(({ link }) => (
          <Wrapper key={uuid()}>
            {link.name && (
              <H5 key={uuid()}>{link.name.replace(/\..+$/, '')}</H5>
            )}
            {link.url && (
              /* eslint-disable-next-line jsx-a11y/media-has-caption */
              <Video controls="controls" key={uuid()}>
                <source key={uuid()} src={link.url} type="video/mp4" />
                <track key={uuid()} label={link.name || ''} src={link.url} />
              </Video>
            )}
          </Wrapper>
        ))}
      </div>
    </>
  )
}

Media.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Media
