import Radium, { StyleRoot } from 'radium';
import React, { Component, PropTypes } from 'react';

class FormTextInput extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type={this.props.type ? this.props.type : 'text'} required={this.props.required} name={this.props.name} defaultValue={this.props.defaultValue} placeholder={this.props.placeholder} onChange={this.props.onChange.bind(this)} style={s.base} />
    )
  }

}

var s = {
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
    width: '100%',
    minHeight: '36px',
    '@media (min-width: 780px)': {
      width: 'auto'
    }
  },
}

// Validate the props passed to this components
FormTextInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  required: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  placeholder: React.PropTypes.string
};

module.exports = Radium(FormTextInput)
