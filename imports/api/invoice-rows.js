import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const InvoiceRows = new Mongo.Collection('invoiceRows');

InvoiceRows.schema = new SimpleSchema({
  invoiceId: {
    type: String,
    label: "Invoice ID",
  },
  createdAt: {
    type: Date,
    label: "Created at",
    defaultValue: new Date(),
    optional: true
  },
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  numberOf: {
    type: Number,
    label: "numberOf",
    min: 0,
    optional: true
  },
  basePrice: {
    type: Number,
    label: "Base price",
    min: 0,
    optional: true
  },
  rowPrice: {
    type: Number,
    label: "Row price",
    optional: true,
  },
});
InvoiceRows.attachSchema(InvoiceRows.schema);

Meteor.methods({
  'invoiceRows.insert'(data) {

    // Make sure the user is logged in (temporary disabled by "false &&")
    if (false && ! Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    InvoiceRows.insert(data);
  },
  'invoiceRows.update'(_id, data) {

    // Make sure the user is logged in (temporary disabled by "false &&")
    if (false && ! Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    InvoiceRows.update(_id, data);
  },
  'invoiceRows.remove'(_id){
    InvoiceRows.remove(_id);
  }
});