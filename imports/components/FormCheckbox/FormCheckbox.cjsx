React = require 'react'
{ Component, PropTypes } = React
Radium = require 'radium'

class Checkbox extends Component

  constructor: ->
    # ...

  render: ->
    <div>
      <input type="checkbox" name={this.props.name} value={this.props.value} onChange={this.props.onChange.bind(this)} style={s.base} /> {this.props.title}
    </div>

s = {
  base: {
    fontWeight: 'bold',
    borderRadius: '4px',
    lineHeight: '36px',
    backgroundColor: '#fff',
    padding: '0 12px',
    border: 'solid #592c0f 1px',
    fontSize: '1.1em',
    fontWeight: 'normal',
    marginRight: '25px',
    marginBottom: '10px',
    # width: '100%',
    '@media (min-width: 780px)': {
      width: 'auto'
    }
  },
}

# Validate the props passed to this components
Checkbox.propTypes = {
  title: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string
}

module.exports = Radium(Checkbox)
