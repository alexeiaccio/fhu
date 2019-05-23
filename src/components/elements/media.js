/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Content } from './shared'
import { uuid } from '../../utils'
import { FlexBox, outlinedStyles } from './boxes'

const ButtonLink = styled(FlexBox.withComponent('a'))`
  ${outlinedStyles};
`

const wrapperStyles = css`
  ${tw(['mt-q24', 'px-q20'])};
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
    <div>
      {items.map(({ link }) => {
        const type = link.name.replace(/^.+\./, '')
        if (!link.url) return null

        return (
          <div css={wrapperStyles} key={uuid()}>
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
    </div>
  )
}

Media.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Media
