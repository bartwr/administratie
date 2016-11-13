import Radium, { StyleRoot } from 'radium';
import React, { Component, PropTypes } from 'react';

class FormLabel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label style={s.base} htmlFor="nothing">
        <div style={Object.assign({}, s.title, this.props.validated == false && s.invalid)}>{this.props.title}</div>
        {this.props.children}
      </label>
    )
  }

}

var s = {
  base: {
    marginTop: '10px'
  },
  title: {
    fontWeight: 'bold',
    lineHeight: '30px',
  },
  invalid: {
    color: '#d32244'
  }
}

// Validate the props passed to this components
FormLabel.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.any.isRequired
};

export default Radium(FormLabel);
