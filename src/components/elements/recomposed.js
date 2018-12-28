import PropTypes from 'prop-types'
import { compose, withStateHandlers, withContext } from 'recompose'
import random from '../../utils/random'

export const withMenu = compose(
  withStateHandlers(
    ({ initial = {} }) => ({
      isVisible: initial,
      isMenu: false,
      levels: initial,
    }),
    {
      toggle: ({ isVisible, levels }) => (key, level) => ({
        isVisible: {
          ...isVisible,
          [key]: isVisible[key] ? false : true, // eslint-disable-line no-unneeded-ternary
        },
        levels: isVisible[key]
          ? {}
          : {
              ...levels,
              [key]: level,
            },
      }),
      toggleMenu: () => value => ({ isMenu: value, isVisible: {}, levels: {} }),
    }
  ),
  withContext(
    {
      isMenu: PropTypes.bool.isRequired,
      isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
      toggle: PropTypes.func.isRequired,
      toggleMenu: PropTypes.func.isRequired,
    },
    ({ isMenu, isVisible, toggle, toggleMenu }) => ({
      isMenu,
      isVisible,
      toggle,
      toggleMenu,
    })
  )
)

export const withRandomState = withStateHandlers(
  ({ init = 0 }) => ({ current: init }),
  { randomize: () => length => ({ current: random(length) }) }
)
