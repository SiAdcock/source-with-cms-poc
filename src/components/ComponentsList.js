import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class ComponentsList extends React.Component {
  render() {
    const { data } = this.props
    const { edges: components } = data.allMarkdownRemark

    return (
      <ul>
        {components &&
          components.map(({ node: component }) => (
            <li key={component.id}>
              <Link
                className="title has-text-primary is-size-4"
                to={component.fields.slug}
              >
                {component.frontmatter.title}
              </Link>
            </li>
          ))}
      </ul>
    )
  }
}

ComponentsList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ComponentsListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "component" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ComponentsList data={data} count={count} />}
  />
)
