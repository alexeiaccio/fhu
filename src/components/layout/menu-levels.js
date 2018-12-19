/* global tw */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import { getContext } from 'recompose'
import { equals, map, propPathOr } from 'crocks'

import { FlexBox, Column } from '../elements/boxs'
import { TextContent } from '../elements/shared'
import Appeared from '../elements/appeared'

const chapterStyles = css`
  ${tw(['font-extrabold', 'text-lg'])};
`

const textStyles = css`
  ${tw(['font-semibold', 'italic', 'text-lg', 'truncate'])};
`

function MenuLevels({ isVisible, items, toggle }) {
  if (!items) return null

  return (
    <Column>
      {map(({ link }) => {
        const document = propPathOr(null, ['document', 0], link)
        const type = equals('chapter', propPathOr(null, ['type'], document))
        const uid = propPathOr(null, ['uid'], document)
        const data = propPathOr(null, ['data'], document)
        const title = propPathOr(null, ['title', 'text'], data)
        const nextLevelItems = propPathOr(null, ['body', 0, 'items'], data)

        return (
          <FlexBox key={uuid()}>
            <TextContent
              css={type ? chapterStyles : textStyles}
              key={uuid()}
              onClick={() => (type ? toggle(uid) : null)}
            >
              {title}
            </TextContent>
            <Appeared key={uuid()} isVisible={isVisible[uid]}>
              <MenuLevels key={uuid()} items={nextLevelItems} />
            </Appeared>
          </FlexBox>
        )
      }, items)}
    </Column>
  )
}

MenuLevels.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.bool),
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func,
}

MenuLevels.defaultProps = {
  isVisible: {},
  items: null,
  toggle: null,
}

export default getContext({
  isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  toggle: PropTypes.func.isRequired,
})(MenuLevels)
