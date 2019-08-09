import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class SideNav extends React.Component {
  render() {
    const { data } = this.props
    const { edges: pages } = data.allMarkdownRemark
    const components = pages.filter(page => page.node.frontmatter.templateKey === 'component')
    const foundations = pages.filter(page => page.node.frontmatter.templateKey === 'foundation')

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
        <p>Foundations</p>
        <ul>
          {foundations &&
            foundations.map(({ node: foundation }) => (
              <li key={foundation.id}>
                <Link
                  className="has-text-primary is-size-6"
                  to={foundation.fields.slug}
                >
                  {foundation.frontmatter.title}
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
          filter: { frontmatter: { templateKey: { in: ["component", "foundation"] } } }
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
