import React, { Component } from 'react'
import moment from 'moment'

// Import models
import { Payments } from '../../models/Payments.js';

class Payment extends Component {

  componentDidMount(props) {
    this.startPayment(props.amount);
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
    var amount = this.props.amount;

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
      redirectUrl: "/order/18025",
      webhookUrl:  "http://service.tuxion.nl/mollie-webhook/"
    });

  }

  render() {
    return (
      <div style={s.base}>
        Thank you
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
