import styled from '@emotion/styled'

export const outlinedStyles = ({ theme }) => `
  outline: 1px solid ${theme.color};
  outline-offset: -0.5px;
`

export default styled.div`
  ${tw(['flex-1', 'w-full'])};
  ${outlinedStyles};
  box-sizing: border-box;
  padding: 0.5px 0;
`
