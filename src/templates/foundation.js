import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const FoundationTemplate = ({
  content,
  contentComponent,
  title,
  helmet,
}) => {
  const FoundationContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <FoundationContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

FoundationTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Foundation = ({ data }) => {
  const { markdownRemark: foundation } = data

  return (
    <Layout>
      <FoundationTemplate
        content={foundation.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Foundation">
            <title>{`${foundation.frontmatter.title}`}</title>
          </Helmet>
        }
        title={foundation.frontmatter.title}
      />
    </Layout>
  )
}

Foundation.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Foundation

export const pageQuery = graphql`
  query FoundationByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
