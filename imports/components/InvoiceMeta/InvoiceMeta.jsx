import React, { Component, PropTypes } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
// Import models
import { Invoices } from '../../api/invoices.js';

// Import templates
import Label from '../FormLabel/FormLabel.jsx';
import TextInput from '../FormTextInput/FormTextInput.jsx';

class InvoiceMeta extends Component {
 
  constructor(props) {
    super(props);

    this.state = {}
  }

  handleChange(e) {
    let tmp = [];
    tmp[$(e.target).attr('name')] = $(e.target).val();
    this.setState(tmp);
  };

  submitForm(e) {
    e.preventDefault();

    this.props.saveHandler(
      Object.assign({}, this.props.invoice, {meta: this.state})
    );
  }

  render() {
    if (!this.props.invoice) return <div />
    return (
      <>
        <h1>Edit invoice meta</h1>
        <ul>
          <li>{this.props.invoice.invoiceNumber}</li>
          <li>{this.props.invoice.client}</li>
          <li>{this.props.invoice.label}</li>
        </ul>
        <form onSubmit={this.submitForm.bind(this)}>
          <Label title="Date fully paid">
            <TextInput type="date" name="dateFullyPaid" defaultValue={this.props.invoice.meta ? this.props.invoice.meta.dateFullyPaid : null} placeholder="Date fully paid" onChange={this.handleChange.bind(this)} />
          </Label>
          <button type="submit">Save</button>
        </form>
      </>
    );
  }
}

// InvoiceMeta.propTypes = {
//   invoiceId: PropTypes.string.isRequired,
// };

export default withTracker((props) => {
  return {
    invoice: Invoices.find({_id: props.invoiceId}).fetch()[0]
  }
})(InvoiceMeta);
