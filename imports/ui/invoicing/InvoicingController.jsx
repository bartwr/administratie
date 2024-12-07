import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
// Import models
import { Invoices } from '../../api/invoices.js';

// Import templates
import InvoiceList from './list/list.jsx';
import InvoiceView from './invoice/invoice.jsx';
import InvoicesStillToBePaid from '/imports/components/InvoicesStillToBePaid/InvoicesStillToBePaid.jsx';

class InvoiceController extends Component {
 
  constructor(props) {
    super(props);

    if( prompt('Wat is het wachtwoord?') != 'hallo daar' ) {
      document.location = 'https://www.bartroorda.nl';
    }
  }

  render() {
    if( ! this.props.invoices) return <div />
    return (
      <div>
        <div hidden={this.props.invoice && this.props.invoice._id}>
          <InvoicesStillToBePaid />
          <InvoiceList invoices={this.props.invoices} />
        </div>
        { this.props.invoice && this.props.invoice._id ? <InvoiceView key={this.props.invoice._id} invoice={this.props.invoice} /> : false }
      </div>
    );
  }
}

export default withTracker((props) => {
  return {
    invoices: Invoices.find({"invoiceNumber": { $gte: "18000" }}, { sort: { invoiceNumber: -1 } }).fetch(),
    invoice: props.invoiceId ? Invoices.find({_id: props.invoiceId}).fetch()[0] : {}//#TODO: Convert this to a Maybe
  }
})(InvoiceController);
