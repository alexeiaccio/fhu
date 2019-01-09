import React, { Component } from 'react'
import PropTypes from 'prop-types'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Location } from '@reach/router'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { outlinedStyles } from '../layout/outlined'
import RichContent from '../elements/rich-content'

const asideStyles = css`
  ${tw(['my-q24'])};
`

const headingStyles = css`
  ${tw(['font-bold', 'text-3xl'])};
`

const formStyles = css`
  ${tw(['flex', 'flex-col', 'mt-q20', 'relative'])};
`

const BorderedBottom = ({ theme }) => css`
  border-bottom: 1px solid ${theme.color};
`

const Input = styled.input`
  ${tw([
    'border-none',
    'font-medium',
    'outline-none',
    'mb-q20',
    'p-q4',
    'text-lg',
    'w-full',
  ])};
  ${BorderedBottom};
  box-sizing: border-box;
  &::placeholder {
    ${tw(['italic'])};
  }
`
const hovered = ({ theme }) => css`
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${theme.color};
  }
`

const Button = styled.button`
  ${tw([
    'bg-white',
    'border-none',
    'cursor-pointer',
    'font-medium',
    'inline-block',
    'mt-q20',
    'p-q12',
    'text-lg',
    'w-full',
  ])};
  ${outlinedStyles};
  ${hovered};
  box-sizing: border-box;
`

const resultBack = ({ result }) => css`
  ${result === 'success' ? tw(['bg-teal-lighter']) : tw(['bg-pink-lighter'])};
`

const Result = styled.div`
  ${tw([
    'absolute',
    'flex',
    'font-medium',
    'items-center',
    'justify-center',
    'leading-loose',
    'p-q24',
    'pin',
    'text-center',
    'text-lg',
  ])};
  ${resultBack};
  margin: -2px;
  & a {
    ${tw(['underline'])}
  }
`

class Subscribe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      NAME: '',
      PATHNAME: props.location.pathname,
      msg: null,
      result: null,
    }
  }

  handleChange = e => {
    const { value, id } = e.target
    this.setState({ [id]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { email, NAME, PATHNAME } = this.state
    const { msg, result } = await addToMailchimp(email, { NAME, PATHNAME })
    this.setState({ msg, result, email: '', NAME: '' })
  }

  render() {
    const { email, NAME, msg, result } = this.state

    return (
      <aside css={asideStyles}>
        <h2 css={headingStyles}>Subscribe</h2>
        <form css={formStyles} onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            id="NAME"
            placeholder="Enter your Name"
            type="text"
            value={NAME}
          />
          <Input
            onChange={this.handleChange}
            id="email"
            placeholder="Enter your Email"
            type="email"
            value={email}
          />
          <Button type="submit">Subscribe</Button>
          {msg && (
            <Result result={result}>
              <RichContent content={msg} />
            </Result>
          )}
        </form>
      </aside>
    )
  }
}

Subscribe.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

const withLocation = () => (
  <Location>{({ location }) => <Subscribe location={location} />}</Location>
)

export default withLocation
