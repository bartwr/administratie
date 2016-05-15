import Radium, { StyleRoot } from 'radium';
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
// Import models
import { Invoices } from '../../api/invoices.js';

// Import templates
import InvoiceList from './list/list.jsx';

class InvoiceController extends Component {
 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <InvoiceList invoices={this.props.invoices} />
      </div>
    );
  }
}


InvoiceController.propTypes = {
  invoices: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    invoices: Invoices.find({}, { sort: { sort: +1 } }).fetch()
  }
}, Radium(InvoiceController));
