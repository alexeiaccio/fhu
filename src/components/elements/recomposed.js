import { withStateHandlers } from 'recompose'

export const withOpener = withStateHandlers(
  {
    isVisible: {},
  },
  {
    toggle: ({ isVisible }) => key => ({
      isVisible: {
        ...isVisible,
        [key]: isVisible[key] ? false : true, // eslint-disable-line no-unneeded-ternary
      },
    }),
  }
)
