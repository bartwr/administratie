import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment'

// Import models
import { Payments } from '../../models/Payments.js';

class Payment extends Component {

  constructor(props) {
    super(props)

    this.state = { status: 'Getting your payment..' }
  }

  // As soon as the payment information is received from mongo: do the payment
  componentWillReceiveProps(nextProps) {
    this.doPayment({
      amount: nextProps.payment.amount,
      description: 'Tuxion: ' + nextProps.payment.title,
      redirectUrl: "https://my.tuxion.nl/order/" + nextProps.payment.invoiceId,
      webhookUrl:  "https://my.tuxion.nl/mollie-webhook/"
    });
  }

  // doPayment :: Object MolliePayment -> void
  doPayment(data) {
    this.setState({
      status: 'Creating new payment'
    });
    var callback = (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        this.setState({
          status: 'Payment succesful created! Redirecting to ' + res.paymentUrl
        });
        window.location = res.paymentUrl
      }
    }
    Meteor.call('mollie.doPayment', data, callback);
  }

  render() {
    return (
      <div style={s.base}>
        <p>Thank you</p>
        <p><small>({this.state.status})</small></p>
      </div>
    )
  }

}

s = {
  base: {
    padding: '20px'
  }
}

export default createContainer((props) => {
  return {
    payment: Payments.find({_id: props.paymentId}).fetch()[0]
  }
}, Payment);
