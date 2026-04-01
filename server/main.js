import { Meteor } from 'meteor/meteor';
import '/imports/api/invoices.js';
import '/imports/api/invoice-rows.js';
import './methods/mollie.js';

Meteor.startup(() => {
  // code to run on server at startup
});
