import Mollie from 'mollie-api-node';
import config from './config.js';

import Future from 'fibers/future';

Meteor.methods({
  'mollie.doPayment'({ todoId, newText }) {
    // new SimpleSchema({
    //   todoId: { type: String },
    //   newText: { type: String }
    // }).validate({ todoId, newText });

    mollie = new Mollie.API.Client;
    mollie.setApiKey(config.mollieApiKey);

    var future = new Future();
    mollie.payments.create({
      amount:      10.00,
      description: "My first API payment",
      redirectUrl: "https://webshop.example.org/order/12345/",
      webhookUrl:  "https://webshop.example.org/mollie-webhook/"
    }, Meteor.bindEnvironment(function (payment) {
      return future.return(payment.getPaymentUrl());
    }));
    return {
      paymentUrl: future.wait()
    }
  }
});
