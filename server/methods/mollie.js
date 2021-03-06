import Mollie from 'mollie-api-node';
import Future from 'fibers/future';

// Insert models
import { Payments } from '../../imports/models/Payments.js';

Meteor.methods({
  // new SimpleSchema({
  //   something: { type: String }
  // }).validate({ something });

  // Insert payment method
  'mollie.insertPayment'({
    dtCreated,
    invoiceId,
    invoiceDate,
    invoiceNumber,
    title,
    description,
    amount,
    dateFullyPaid,
    molliePaymentId,
    molliePaymentStatus
  }) {

    // Insert payment
    res = Payments.insert({
      dtCreated,
      invoiceId,
      invoiceDate,
      invoiceNumber,
      title,
      description,
      amount,
      dateFullyPaid,
      molliePaymentId,
      molliePaymentStatus
    });

    return res;

  },
  'mollie.doPayment'({ amount, description, redirectUrl, webhookUrl }) {
    // new SimpleSchema({
    //   something: { type: String }
    // }).validate({ todoId, newText });

    console.log('Starting to do a payment')

    mollie = new Mollie.API.Client;
    mollie.setApiKey(process.env.MOLLIE_API_KEY);

    console.log('process.env.MOLLIE_API_KEY', process.env.MOLLIE_API_KEY);

    var future = new Future();
    mollie.payments.create({
      amount:      amount,
      description: description,
      redirectUrl: redirectUrl,
      webhookUrl:  webhookUrl
    }, Meteor.bindEnvironment(function (payment) {
      console.log(payment);
      return future.return(payment.getPaymentUrl());
    }));
    return {
      paymentUrl: future.wait()
    }
  }
});
