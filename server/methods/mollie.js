import Mollie from 'mollie-api-node';

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
  async 'mollie.doPayment'({ amount, description, redirectUrl, webhookUrl }) {
    // new SimpleSchema({
    //   something: { type: String }
    // }).validate({ todoId, newText });

    console.log('Starting to do a payment')

    const mollie = new Mollie.API.Client();
    mollie.setApiKey(process.env.MOLLIE_API_KEY);

    console.log('process.env.MOLLIE_API_KEY', process.env.MOLLIE_API_KEY);

    const payment = await mollie.payments.create({
      amount,
      description,
      redirectUrl,
      webhookUrl
    });
    console.log(payment);
    return {
      paymentUrl: payment.getPaymentUrl()
    };
  }
});
