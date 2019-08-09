import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class SideNav extends React.Component {
  render() {
    const { data } = this.props
    const { edges: components } = data.allMarkdownRemark

    return (
      <nav className="sidenav">
        <Link 
          className="has-text-primary is-size-6"
          to="/"
        >
          Home
        </Link>
        <p>Components</p>
        <ul>
          {components &&
            components.map(({ node: component }) => (
              <li key={component.id}>
                <Link
                  className="has-text-primary is-size-6"
                  to={component.fields.slug}
                >
                  {component.frontmatter.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    )
  }
}

SideNav.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query SideNavQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "component" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <SideNav data={data} count={count} />}
  />
)
