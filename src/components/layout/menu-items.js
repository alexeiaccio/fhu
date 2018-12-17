import { jsx } from '@emotion/core' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { map, propPathOr } from 'crocks'

function MenuItems({ items }) {
  if (!items) return null

  return (
    <ul>
      {map(({ data, id, uid }) => {
        const title = propPathOr(
          propPathOr(null, ['title', 'about'], data),
          ['title', 'text'],
          data
        )
        return (
          <li key={id}>
            <Link key={uid} to={`/${uid}`}>
              {title}
            </Link>
          </li>
        )
      }, items)}
    </ul>
  )
}

MenuItems.propTypes = {
  items: PropTypes.arrayOf({
    data: PropTypes.object,
    id: PropTypes.string,
    uid: PropTypes.string,
  }),
}

MenuItems.defaultProps = {
  items: null,
}

export default MenuItems
