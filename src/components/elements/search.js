import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { propPathOr, uuid } from '../../utils'
import { FlexBox, SimpleBox } from './boxes'
import Tags from './tags'

const SearchIcon = FlexBox.withComponent('button')
const searchIconStyles = ({ isOpen }) => css`
  ${tw([
    'absolute',
    'border-none',
    'cursor-pointer',
    'flex-no-grow',
    'font-bold',
    'items-center',
    'justify-center',
    'ml-auto',
    'pin-b',
    'pin-r',
    'pin-t',
    'px-q12',
    'text-lg',
    'z-30',
    'md:px-q24',
  ])};
  ${isOpen && tw(['bg-teal'])};
`

const Open = ({ isOpen }) => css`
  ${isOpen && tw(['flex'])};
`

const Wrapper = styled.div`
  ${tw(['absolute', 'bg-white', 'hidden', 'pin', 'z-10'])};
  ${Open};
`

const paddingsStyles = css`
  ${tw(['p-q12', 'w-full', 'md:p-q24'])};
  box-sizing: border-box;
`

const BorderedBottom = ({ theme }) => css`
  border-bottom: 4px solid ${theme.color};
`

const Input = styled.input`
  ${tw([
    'border-none',
    'font-medium',
    'outline-none',
    'p-q4',
    'text-lg',
    'w-1/2',
  ])};
  ${BorderedBottom};
  &::placeholder {
    ${tw(['italic'])};
  }
`

const Results = styled.div`
  ${tw(['absolute', 'hidden', 'pin-b', 'pin-l', 'pin-r', 'z-20'])};
  ${Open};
  transform: translateY(100%);
`

const ResultsList = SimpleBox.withComponent('ul')
const resultListStyles = css`
  ${tw(['py-q8', 'md:py-q20'])};
`
const liStyles = css`
  ${tw([
    'inline-block',
    'leading-normal',
    'px-q12',
    'py-q4',
    'w-full',
    'hover:bg-teal-lighter',
    'md:px-q24',
  ])};
`
const linkStyles = css`
  ${tw(['inline-block', 'w-full'])};
`
const searchedTitleStyles = css`
  ${tw(['font-extrabold'])};
`

class Search extends Component {
  constructor(props) {
    super(props)
    this.input = createRef()
    this.state = {
      isOpen: false,
      query: '',
      results: [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.resetState()
    }
    if (this.state.isOpen && !prevState.isOpen) {
      this.input.current.focus()
    }
  }

  resetState = () => {
    this.setState({ isOpen: false, query: '', results: [] })
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.search.index) // Create an elastic lunr index and hydrate with graphql query results

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({ query })

    if (query.length > 1) {
      this.setState({
        results: this.index
          .search(query, { expand: true })
          .map(({ ref }) => this.index.documentStore.getDoc(ref)), // Map over each ID and return the full document
      })
    }
  }

  handleClick = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
      query: '',
      results: [],
    }))
  }

  render() {
    return (
      <>
        <SearchIcon
          css={searchIconStyles}
          isOpen={!this.state.isOpen}
          onClick={this.handleClick}
          type="button"
        >
          {this.state.isOpen ? 'Close' : 'Search'}
        </SearchIcon>
        <Wrapper isOpen={this.state.isOpen}>
          <div css={paddingsStyles}>
            <Input
              onChange={this.search}
              placeholder="Search"
              ref={this.input}
              type="search"
              value={this.state.query}
            />
          </div>
        </Wrapper>
        <Results isOpen={this.state.results.length}>
          <ResultsList css={resultListStyles}>
            {this.state.results.slice(0, 5).map(page => {
              const regex = new RegExp(`(${this.state.query}.+?)(")`, 'gim')
              const regexQuery = new RegExp(
                `(${this.state.query})(.{0,48})`,
                'gim'
              )
              const matched = regex.exec(page.data)
              const searched = propPathOr(null, [1], matched)
              const matchedQuery = regexQuery.exec(searched)
              const searchedQuery = propPathOr('', [1], matchedQuery)
              const restQuery = propPathOr('', [2], matchedQuery)

              return (
                <li css={liStyles} key={uuid()}>
                  <Link css={linkStyles} to={`/${page.uid}`}>
                    <span css={searchedTitleStyles}>{page.title}</span>
                    <span>
                      :{' '}
                      <span style={{ background: 'yellow' }}>
                        {searchedQuery}
                      </span>
                      {restQuery}...
                    </span>
                    <Tags
                      css={css`
                        ${tw(['inline-flex'])};
                        float: right;
                      `}
                      tags={page.tags}
                    />
                  </Link>
                </li>
              )
            })}
          </ResultsList>
        </Results>
      </>
    )
  }
}

Search.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  search: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default Search
