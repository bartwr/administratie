import React from 'react';
import { createRoot } from 'react-dom/client';

let root;

const getRoot = () => {
  if (root) return root;

  let container = document.getElementById('root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';

    const mountParent = document.body || document.documentElement;
    mountParent.appendChild(container);
  }

  root = createRoot(container);
  return root;
};

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
    getRoot().render(<App content={
      <Payment paymentId={props.paymentId} />
    } />);
  }
});

import Order from '../imports/components/Order/Order.jsx';

FlowRouter.route('/order/:paymentId', {
  name: 'order',
  action(props) {
    getRoot().render(<App content={
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
    getRoot().render(<App content={
      <InvoicingController />
    } />);
  }
});

FlowRouter.route('/invoice', {
  action() {
    getRoot().render(<App content={
      <InvoicingController />
    } />);
  }
});

FlowRouter.route('/invoice/:invoiceId', {
  name: 'invoice',
  action(params) {
    getRoot().render(<App content={
      <InvoicingController invoiceId={params.invoiceId} />
    } />);
  }
});

import InvoiceMeta from '/imports/containers/InvoiceMeta/InvoiceMeta.jsx';

FlowRouter.route('/invoice/:invoiceId/meta', {
  name: 'invoiceMeta',
  action(params) {
    getRoot().render(<App content={
      <InvoiceMeta invoiceId={params.invoiceId} />
    } />);
  }
});
