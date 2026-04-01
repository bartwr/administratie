import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
// Import models
import { Invoices } from '../../api/invoices.js';

// Import templates
import InvoiceList from './list/list.jsx';
import InvoiceView from './invoice/invoice.jsx';
import InvoicesStillToBePaid from '/imports/components/InvoicesStillToBePaid/InvoicesStillToBePaid.jsx';

const PASSWORD_SESSION_KEY = 'invoicing-password-ok';

const hasAccess = () => {
  if (window.sessionStorage.getItem(PASSWORD_SESSION_KEY) === '1') return true;

  const answer = window.prompt('Wat is het wachtwoord?');
  if (answer === 'hallo daar') {
    window.sessionStorage.setItem(PASSWORD_SESSION_KEY, '1');
    return true;
  }

  window.location = 'https://www.bartroorda.nl';
  return false;
};

class InvoiceController extends Component {
 
  constructor(props) {
    super(props);
    this.authorized = hasAccess();
  }

  render() {
    if (!this.authorized) return null;
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
