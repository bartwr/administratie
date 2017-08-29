import React from 'react';
import {mount} from 'react-mounter';

/**
 *  App
 */
import App from '../imports/ui/App.jsx';

/**
 *  InvoicingController
 */
import InvoicingController from '../imports/ui/invoicing/InvoicingController.jsx';

FlowRouter.route('/', {
  name: 'dashboard',
  action() {
    mount(App, {
      content: (<InvoicingController />)
    });
  }
});

FlowRouter.route('/invoice', {
  action() {
    mount(App, {
      content: (<InvoicingController />)
    });
  }
});

FlowRouter.route('/invoice/:invoiceId', {
  name: 'invoice',
  action(params) {
    mount(App, {
      content: (<InvoicingController invoiceId={params.invoiceId} />)
    });
  }
});

import InvoiceMeta from '/imports/containers/InvoiceMeta/InvoiceMeta.jsx';

FlowRouter.route('/invoice/:invoiceId/meta', {
  name: 'invoiceMeta',
  action(params) {
    mount(App, {
      content: (<InvoiceMeta invoiceId={params.invoiceId} />)
    });
  }
});
