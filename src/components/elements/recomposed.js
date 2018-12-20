import PropTypes from 'prop-types'
import { compose, withStateHandlers, withContext } from 'recompose'

export const withOpener = compose(
  withStateHandlers(
    ({ initial = {} }) => ({
      isVisible: initial,
    }),
    {
      toggle: ({ isVisible }) => key => ({
        isVisible: {
          ...isVisible,
          [key]: isVisible[key] ? false : true, // eslint-disable-line no-unneeded-ternary
        },
      }),
    }
  ),
  withContext(
    {
      isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
      toggle: PropTypes.func.isRequired,
    },
    ({ isVisible, toggle }) => ({
      isVisible,
      toggle,
    })
  )
)
