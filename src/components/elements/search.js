/* global tw */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import { propPathOr } from 'crocks'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { FlexBox, SimpleBox } from './boxes'

const SearchIcon = FlexBox.withComponent('button')
const searchIconStyles = css`
  ${tw([
    'absolute',
    'border-none',
    'cursor-pointer',
    'flex-no-grow',
    'font-bold',
    'ml-auto',
    'pin-b',
    'pin-r',
    'pin-t',
    'px-q12',
    'text-lg',
    'z-30',
    'md:px-q24',
  ])};
  ${({ isOpen }) => isOpen && tw(['bg-teal'])};
`

const Wrapper = styled.div`
  ${tw(['absolute', 'hidden', 'pin', 'z-10'])};
  ${({ isOpen }) => isOpen && tw(['flex'])};
`

const Results = styled.div`
  ${tw(['absolute', 'hidden', 'pin-b', 'pin-l', 'pin-r', 'z-20'])};
  ${({ isOpen }) => isOpen && tw(['flex'])};
  transform: translateY(100%);
`

const ResultsList = SimpleBox.withComponent('ul')
const paddingsStyles = css`
  ${tw(['p-q12', 'md:p-q24'])};
`

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      query: '',
      results: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.resetState()
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
    this.setState(state => ({ isOpen: !state.isOpen }))
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
          Search
        </SearchIcon>
        <Wrapper isOpen={this.state.isOpen}>
          <SimpleBox css={paddingsStyles}>
            <input
              type="text"
              value={this.state.query}
              onChange={this.search}
            />
          </SimpleBox>
        </Wrapper>
        <Results isOpen={this.state.results.length}>
          <ResultsList css={paddingsStyles}>
            {this.state.results.slice(0, 4).map(page => {
              const regex = RegExp(
                `(?<searched>${this.state.query}.+?)(")`,
                'gim'
              )
              const regexQuery = RegExp(
                `(?<searched>${this.state.query})(?<rest>.{0,48})`,
                'gim'
              )
              const matched = regex.exec(page.data)
              const searched = propPathOr(null, ['groups', 'searched'], matched)
              const matchedQuery = regexQuery.exec(searched)
              const searchedQuery = propPathOr(
                '',
                ['groups', 'searched'],
                matchedQuery
              )
              const restQuery = propPathOr('', ['groups', 'rest'], matchedQuery)

              return (
                <li key={page.uid}>
                  <Link to={`/${page.uid}`}>{page.title}</Link>
                  <span>
                    :{' '}
                    <span style={{ background: 'yellow' }}>
                      {searchedQuery}
                    </span>
                    {restQuery}...
                  </span>
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
