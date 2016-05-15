import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Invoices = new Mongo.Collection('invoices');

Meteor.methods({
  'invoices.insert'(data) {

    // check(data.invoiceNumber, String);

    // Make sure the user is logged in (temporary disabled by "false &&")
    if (false && ! Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Invoices.insert({
      createdAt: new Date(),
      invoiceDate: data.invoiceDate,
      invoiceNumber: data.invoiceNumber,
      client: data.client,
      title: data.title,
      description: data.description,
      amount: data.amount,
      paymentStatus: data.paymentStatus,
      dateFullyPaid: data.dateFullyPaid,
    });
  },
  'invoices.update'(_id, data) {

    // Make sure the user is logged in (temporary disabled by "false &&")
    if (false && ! Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Invoices.update(_id, {
      modifiedAt: new Date(),
      invoiceDate: data.invoiceDate,
      invoiceNumber: data.invoiceNumber,
      client: data.client,
      title: data.title,
      description: data.description,
      amount: data.amount,
      paymentStatus: data.paymentStatus,
      dateFullyPaid: data.dateFullyPaid,
    });
  },
  'invoices.remove'(_id){
    check(_id, String);

    Invoices.remove(_id);
  }
});