import Radium, { StyleRoot } from 'radium';
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
// Import models
import { Invoices } from '../../api/invoices.js';

// Import templates
import InvoiceList from './list/list.jsx';
import InvoiceView from './invoice/invoice.jsx';

class InvoiceController extends Component {
 
  constructor(props) {
    super(props);

    // this.state :: {activeInvoice :: {}, isInvoiceViewVisible :: Boolean}
    this.state = { activeInvoice: {}, isInvoiceViewVisible: false }
  }

  // viewInvoice :: Event -> ?
  viewInvoice(invoice) {
    this.state.activeInvoice = invoice;
    this.state.isInvoiceViewVisible = true;
    this.forceUpdate();
  }

  render() {
    let invoiceView = this.state.isInvoiceViewVisible ? <InvoiceView key={this.state.activeInvoice._id} invoice={this.state.activeInvoice} /> : false
    return (
      <div>
        <InvoiceList invoices={this.props.invoices} viewInvoice={this.viewInvoice.bind(this)} />
        {invoiceView}
      </div>
    );
  }
}


InvoiceController.propTypes = {
  invoices: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    invoices: Invoices.find({}, { sort: { invoiceNumber: -1 } }).fetch()
  }
}, Radium(InvoiceController));
