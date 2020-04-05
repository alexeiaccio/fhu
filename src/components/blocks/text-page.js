import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { compose, chain, filter, map, propPathOr } from '../../utils'
import Layout from '../layout'
import Seo from '../seo'
import Img from '../elements/img'
import Related from '../elements/related'
import RichContent from '../elements/rich-content'
import Tags from '../elements/tags'
import Subscribe from './subscribe'
import OtherNews from './other-news'
import TextBody from './text-body'

function TextPage({ data, location }) {
  const pageData = propPathOr(null, ['texts', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageDescription = propPathOr(null, ['description', 'text'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(
    null,
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    pageData
  )
  const pathname = propPathOr('/', ['pathname'], location)
  const textsUid = propPathOr(null, ['texts', 'uid'], data)
  const texts = propPathOr(null, ['texts', 'data'], data)
  const tags = propPathOr(null, ['texts', 'tags'], data)
  const imgSrc = propPathOr(null, ['image'], texts)
  const title = propPathOr(null, ['title', 'html'], texts)
  const body = propPathOr(null, ['body'], texts)

  const people = propPathOr(null, ['people', 'edges'], data)
  const peopleNode = map(propPathOr(null, ['node']), people)
  const filterPeople = compose(
    chain(map(propPathOr(null, ['prismicId']))),
    map(
      filter(node => {
        const items = propPathOr([], ['items'], node)
        return items.some(
          item => propPathOr(null, ['link', 'uid'], item) === textsUid
        )
      })
    ),
    map(propPathOr(null, ['node', 'data', 'body']))
  )
  const relatedTexts = filter(
    item =>
      filterPeople(people).some(
        x => x && x.includes(propPathOr('', ['id'], item))
      ),
    peopleNode
  )
  const isNews = tags.find((tag = '') => tag.toLowerCase().includes('news'))

  return (
    <Layout>
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <article>
        <RichContent
          css={css`
            & h1 {
              ${tw([
                'break-words',
                'font-extrabold',
                'mb-q24',
                'mt-q24',
                'text-5xl',
              ])}
            }
          `}
          content={title}
        />
        <div
          css={css`
            ${tw(['absolute', 'm-q12', 'pin-r', 'pin-t', 'z-10'])}
          `}
        >
          <Tags tags={tags} />
        </div>
        <Img
          css={css`
            max-height: 80vh;
          `}
          src={imgSrc}
        />
        <TextBody body={body} truncated={!!isNews} />
      </article>
      <aside
        css={css`
          ${tw(['pb-q24', 'w-full'])};
          margin: 0 auto;
          max-width: 40rem;
        `}
      >
        {isNews ? (
          <>
            <OtherNews pathname={pathname} />
            <Subscribe />
          </>
        ) : (
          <Related items={relatedTexts} />
        )}
      </aside>
    </Layout>
  )
}

TextPage.propTypes = {
  data: PropTypes.shape({
    texts: PropTypes.object.isRequired,
    people: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default TextPage
