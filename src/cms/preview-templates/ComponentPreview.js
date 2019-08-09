import React from 'react'
import PropTypes from 'prop-types'
import { ComponentTemplate } from '../../templates/component'

const Component = ({ entry, widgetFor }) => (
  <ComponentTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
  />
)

Component.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default Component
