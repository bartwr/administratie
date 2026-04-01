import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); 

/**
 *  App
 */
import App from '../imports/ui/App.jsx';

/**
 *  Payment
 */
import Payment from '../imports/components/Payment/Payment.jsx';

FlowRouter.route('/pay/:paymentId', {
  name: 'payment',
  action(props) {
    root.render(<App content={
      <Payment paymentId={props.paymentId} />
    } />);
  }
});

import Order from '../imports/components/Order/Order.jsx';

FlowRouter.route('/order/:paymentId', {
  name: 'order',
  action(props) {
    root.render(<App content={
      <Order paymentId={props.paymentId} />
    } />);
  }
});

/**
 *  InvoicingController
 */
import InvoicingController from '../imports/ui/invoicing/InvoicingController.jsx';

FlowRouter.route('/', {
  name: 'dashboard',
  action() {
    root.render(<App content={
      <InvoicingController />
    } />);
  }
});

FlowRouter.route('/invoice', {
  action() {
    root.render(<App content={
      <InvoicingController />
    } />);
  }
});

FlowRouter.route('/invoice/:invoiceId', {
  name: 'invoice',
  action(params) {
    root.render(<App content={
      <InvoicingController invoiceId={params.invoiceId} />
    } />);
  }
});

import InvoiceMeta from '/imports/containers/InvoiceMeta/InvoiceMeta.jsx';

FlowRouter.route('/invoice/:invoiceId/meta', {
  name: 'invoiceMeta',
  action(params) {
    root.render(<App content={
      <InvoiceMeta invoiceId={params.invoiceId} />
    } />);
  }
});
