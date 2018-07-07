import React, { Component } from 'react'
import moment from 'moment'

// Import models
import Payments from '../../models/Payments.js';

class Payment extends Component {

  componentDidMount() {
    this.startPayment();
  }

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

  startPayment() {
    var amount = 10.00;

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
      description: "Bart's second API payment",
      redirectUrl: "https://service.tuxion.nl/order/12345/",
      webhookUrl:  "https://service.tuxion.nl/mollie-webhook/"
    });

  }

  render() {
    return (
      <div style={s.base}>
        Pay day
      </div>
    )
  }

}

s = {
  base: {
    padding: '20px'
  }
}

module.exports = Payment
