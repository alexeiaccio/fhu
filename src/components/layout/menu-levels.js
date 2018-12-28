/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'

import { equals, map, propPathOr, uuid } from '../../utils'
import { FlexBox, Column } from '../elements/boxes'
import { TextContent } from '../elements/shared'
import Appeared from '../elements/appeared'

const chapterStyles = css`
  ${tw(['font-extrabold', 'truncate'])};
`

const textStyles = css`
  ${tw(['font-semibold', 'italic', 'truncate'])};
`

const MenuLevels = getContext({
  isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  toggle: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
})(({ isVisible, items, toggle, toggleMenu }) => {
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
              onClick={() => {
                if (type) {
                  if (toggle) {
                    toggle(uid, 'chapter')
                  }
                } else {
                  navigate(uid)
                  toggle(null, 'main')
                  if (toggleMenu) {
                    toggleMenu(false)
                  }
                }
              }}
            >
              {title}
            </TextContent>
            <Appeared isVisible={isVisible[uid]}>
              <MenuLevels items={nextLevelItems} />
            </Appeared>
          </FlexBox>
        )
      }, items)}
    </Column>
  )
})

MenuLevels.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.bool),
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func,
  toggleMenu: PropTypes.func,
}

MenuLevels.defaultProps = {
  isVisible: {},
  items: null,
  toggle: null,
  toggleMenu: null,
}

export default MenuLevels
