import { css } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { propPathOr } from '../../utils'
import { FlexBox, outlinedStyles } from './boxes'
import { Content } from './shared'

const ButtonLink = styled(FlexBox.withComponent('a'))`
  ${outlinedStyles};
`

const wrapperStyles = css`
  ${tw(['max-w-md', 'mt-q24', 'px-q20', 'w-full'])};
  box-sizing: border-box;
`

const headingStyles = css`
  ${tw(['font-medium', 'text-lg'])};
`

const videoStyles = css`
  ${tw(['h-q40', 'mt-q12', 'w-full'])};
`

function Media({ items }) {
  if (!items) return null

  return (
    <>
      {items.map(item => {
        const link = propPathOr(null, ['link', 'raw'], item)

        if (!link) return null

        const type = link.name && link.name.replace(/^.+\./, '')

        return (
          <div css={wrapperStyles} key={link.url}>
            {link.name && (
              <h5 css={headingStyles}>{link.name.replace(/\..+$/, '')}</h5>
            )}
            {type === 'pdf' ? (
              <ButtonLink
                css={css`
                  ${tw(['my-q24'])};
                `}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Content>Download PDF ↓</Content>
              </ButtonLink>
            ) : (
              /* eslint-disable-next-line jsx-a11y/media-has-caption */
              <video css={videoStyles} controls="controls">
                <source src={link.url} type="video/mp4" />
                <track label={link.name || ''} src={link.url} />
              </video>
            )}
          </div>
        )
      })}
    </>
  )
}

Media.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Media
