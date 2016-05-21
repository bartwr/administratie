import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { InvoiceRows }  from './invoice-rows.js';

export const Invoices = new Mongo.Collection('invoices');

Invoices.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: "Created at",
    defaultValue: new Date(),
    optional: true
  },
  modifiedAt: {
    type: Date,
    label: "Modified at",
    optional: true
  },
  invoiceDate: {
    type: Date,
    label: "Invoice date",
    defaultValue: new Date(),
    optional: true
  },
  invoiceNumber: {
    type: String,
    label: "Invoice number",
    max: 200,
    optional: true
  },
  client: {
    type: String,
    label: "Client",
    optional: true
  },
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  description: {
    type: String,
    label: "Description",
    optional: true
  },
  amount: {
    type: Number,
    label: "Amount",
    min: 0,
    optional: true
  },
  paymentStatus: {
    type: String,
    label: "Payment status",
    optional: true,
  },
  dateFullyPaid: {
    type: Date,
    label: "Date fully paid",
    optional: true
  }
});
// Invoices.attachSchema(Invoices.schema);

Invoices.helpers({
  invoiceRows() {
    return InvoiceRows.find({invoiceId: this._id}, {sort: {createdAt: 1}});
  },
  invoicePrice() {
    var invoicePrice = 0;
    InvoiceRows.find({invoiceId: this._id}).map(function(row){
      invoicePrice += row.rowPrice;
    });
    return invoicePrice;
  },
});

Meteor.methods({
  'invoices.insert'(data) {

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

    data.modifiedAt = new Date();
    data.invoiceDate = new Date(data.invoiceDate);

    Invoices.update(_id, data);
  },
  'invoices.remove'(_id){
    check(_id, String);

    Invoices.remove(_id);
  }
});