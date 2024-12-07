import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
// Import models
import { Invoices } from '../../api/invoices.js';

// Import templates
import InvoiceMetaComponent from '../../components/InvoiceMeta/InvoiceMeta.jsx';

class InvoiceMeta extends Component {
 
  constructor(props) {
    super(props);
  }

  saveHandler(data) {
    Invoices.update(this.props.invoiceId, data);
  }

  render() {
    return (
      <InvoiceMetaComponent invoiceId={this.props.invoiceId} saveHandler={this.saveHandler.bind(this)} />
    )
  }
}
// 
// InvoiceMeta.propTypes = {
//   invoiceId: PropTypes.string.isRequired,
// };

export default withTracker((props) => {
  return {
    invoice: Invoices.find({_id: props.invoiceId}).fetch()[0]
  }
})(InvoiceMeta);
