import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import uuid from 'uuid/v4'
import { map, propPathOr } from 'crocks'
import { getContext } from 'recompose'

import { navigate } from 'gatsby'
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

  return (
    <>
      {map(({ data, uid }) => {
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
            <TextContent
              key={uuid()}
              css={valueStyles}
              onClick={() => toggle(uid, 'volume')}
            >
              {title}
            </TextContent>
            <Appeared key={uuid()} isVisible={isVisible[uid]}>
              <MenuChapters key={uuid()} items={chapterItems} />
            </Appeared>
          </FlexBox>
        )
      }, items)}
    </>
  )
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
