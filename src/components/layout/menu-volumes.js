/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'
import { navigate } from 'gatsby'

import { propPathOr, uuid } from '../../utils'
import { FlexBox } from '../elements/boxes'
import MenuChapters from './menu-levels'
import News from './news'
import { TextContent } from '../elements/shared'
import Appeared from '../elements/appeared'

const valueStyles = css`
  ${tw(['font-extrabold'])};
`

function MenuVolumes({ isVisible, items, toggle }) {
  if (!items) return null

  return items.map(({ data, uid }) => {
    const title = propPathOr(null, ['title', 'text'], data)
    const chapterItems = propPathOr(null, ['body', 0, 'items'], data)

    if (uid === 'news') {
      return <News key={uuid()} />
    }
    if (!chapterItems) {
      return (
        <FlexBox key={uuid()}>
          <TextContent
            key={uuid()}
            css={valueStyles}
            onClick={() => navigate(uid)}
          >
            {title}
          </TextContent>
        </FlexBox>
      )
    }

    return (
      <FlexBox key={uuid()}>
        <TextContent css={valueStyles} onClick={() => toggle(uid, 'volume')}>
          {title}
        </TextContent>
        <Appeared isVisible={isVisible[uid]}>
          <MenuChapters items={chapterItems} />
        </Appeared>
      </FlexBox>
    )
  })
}

MenuVolumes.propTypes = {
  isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func.isRequired,
}

MenuVolumes.defaultProps = {
  items: null,
}

export default getContext({
  isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
  toggle: PropTypes.func.isRequired,
})(MenuVolumes)
