import { withStateHandlers } from 'recompose'

export const withOpener = withStateHandlers(
  {
    isVisible: false,
  },
  {
    toggle: ({ isVisible }) => () => ({ isVisible: !isVisible }),
  }
)
