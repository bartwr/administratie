import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Radium from 'radium';
import moment from 'moment';

// Import models
import { Invoices } from '../../../api/invoices.js';
import { Payments } from '../../../models/Payments.js';
 
class Invoice extends Component {
 
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    invoiceId = document.location.pathname.split('/')[2];
    if(invoiceId != undefined && invoiceId == this.props.invoice._id){
      this.viewThisInvoice();
    }
  }

  // viewThisInvoice :: Event -> ?
  viewThisInvoice() { FlowRouter.go('invoice', { invoiceId: this.props.invoice._id } ) }

  // viewThisInvoice :: Event -> ?
  viewMeta() { FlowRouter.go('invoiceMeta', { invoiceId: this.props.invoice._id } ) }

  // viewThisInvoice :: Event -> ?
  viewMeta() { FlowRouter.go('invoiceMeta', { invoiceId: this.props.invoice._id } ) }

  // deleteThisInvoice :: Event -> 1/0
  deleteThisInvoice() { if(confirm('Sure?')) Invoices.remove(this.props.invoice._id); }

  // getPaymentUrl :: Object invoice -> void
  getPaymentUrl(invoice) {

    const insertPaymentCallback = (err, res) => {
      if (err) {
        console.log(err);
        alert(err);
      } else {
        // Success!
        prompt('This is the payment URL for: ' + invoice.title, 'https://service.tuxion.nl/pay/' + res);
      }
    }

    Meteor.call('mollie.insertPayment', {
      dtCreated: moment().format(),
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate.toString(),
      title: invoice.title,
      amount: (invoice.invoicePrice() * 1.21),
      dateFullyPaid: null,
      molliePaymentId: null,
      molliePaymentStatus: 'open'
    }, insertPaymentCallback);

  }

  render() {
    return (
      <div className="invoice" data-id={this.props.invoice._id} style={Object.assign({}, s.base, (this.props.invoice.meta && this.props.invoice.meta.dateFullyPaid) && s.isFullyPaid)}>
        <div style={s.col}>{this.props.invoice.invoiceNumber}</div>
        <div style={s.col}>{this.props.invoice.invoiceDate.toString()}</div>
        <div style={s.col}>{this.props.invoice.client}</div>
        <div style={s.col}>{this.props.invoice.title}</div>
        <div style={s.col}>{this.props.invoice.amount}</div>
        <div style={s.col}>{this.props.invoice.paymentStatus}</div>
        <div style={s.col}>
          <button onClick={this.viewThisInvoice.bind(this)}>Invoice</button>
        </div>
        <div style={s.col}>
          <button onClick={this.viewMeta.bind(this)}>Meta</button>
        </div>
        <div style={s.col}>
          <a href={'https://service.tuxion.nl/pay/' + (this.props.payment ? this.props.payment._id : 'NOID')} target="_blank">
            Pay
          </a>&nbsp;
          <button onClick={() => this.getPaymentUrl(this.props.invoice)}>
            Generate
          </button>
        </div>
        <div style={s.col}>
          <button onClick={this.deleteThisInvoice.bind(this)}>&times;</button>
        </div>
      </div>
    );
  }

}

var s = {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 5px',
    ':hover': {
      backgroundColor: '#ccc'
    }
  },
  isFullyPaid: {
    color: 'green'
  },
  col: {
    flex: 1
  }
}

export default createContainer((props) => {
  return {
    payment: Payments.find({invoiceId: props.invoice._id}).fetch()[0]
  }
}, Radium(Invoice));
