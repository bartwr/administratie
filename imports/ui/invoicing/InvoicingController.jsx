import Radium, { StyleRoot } from 'radium';
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
// Import models
import { Invoices } from '../../api/invoices.js';

// Import templates
import InvoiceList from './list/list.jsx';
import InvoiceView from './invoice/invoice.jsx';
import InvoicesStillToBePaid from '/imports/components/InvoicesStillToBePaid/InvoicesStillToBePaid.jsx';

class InvoiceController extends Component {
 
  constructor(props) {
    super(props);
  }

  render() {
    if( ! this.props.invoices) return <div />
    if( prompt('Wat is het wachtwoord?') != process.env.ADMIN_PASSWD ) return <div />
    return (
      <StyleRoot>
        <div hidden={this.props.invoice && this.props.invoice._id}>
          <InvoicesStillToBePaid />
          <InvoiceList invoices={this.props.invoices} />
        </div>
        { this.props.invoice && this.props.invoice._id ? <InvoiceView key={this.props.invoice._id} invoice={this.props.invoice} /> : false }
      </StyleRoot>
    );
  }
}

InvoiceController.propTypes = {
  invoices: PropTypes.array
};

export default createContainer((props) => {
  return {
    invoices: Invoices.find({"invoiceNumber": { $gte: "18000" }}, { sort: { invoiceNumber: -1 } }).fetch(),
    invoice: props.invoiceId ? Invoices.find({_id: props.invoiceId}).fetch()[0] : {}//#TODO: Convert this to a Maybe
  }
}, Radium(InvoiceController));
