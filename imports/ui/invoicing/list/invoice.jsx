import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Radium from 'radium';
import moment from 'moment';

// Import models
import { Invoices } from '../../../api/invoices.js';
 
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

  /*
   Mollie
  */

  insertPayment(data) {
    const callback = (err, res) => {
      if (err) {
        alert(err);
      } else {
        // Success!
        // ..
      }
    }
    Meteor.call('mollie.insertPayment', data, callback);
  }

  doPayment(data) {
    var callback = (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        window.location = res.paymentUrl
      }
    }
    Meteor.call('mollie.doPayment', data, callback);
  }

  startPayment(amount) {

    this.insertPayment({
      dtCreated: moment().format(),
      invoiceId: '',
      invoiceNumber: '',
      invoiceDate: '',
      title: '',
      description: '',
      amount: amount,
      dateFullyPaid: '',
      molliePaymentId: '',
      molliePaymentStatus: ''
    });

    this.doPayment({
      amount: amount,
      description: "Payment of " + amount + " EUR, via service.tuxion.nl",
      redirectUrl: "http://service.tuxion.nl//return-page.php?invoice=113&hash=4b1c5d57daef9636d5786791de13dea1",
      webhookUrl:  "http://service.tuxion.nl/mollie-webhook/"
    });

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
          <button onClick={() => this.startPayment(this.props.invoice.invoicePriceIncTax())}>Pay</button>
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

export default Radium(Invoice);
