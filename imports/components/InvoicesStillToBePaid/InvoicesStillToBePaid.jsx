import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import R from 'ramda';
 
// Import models
import { Invoices } from '../../api/invoices.js';

class InvoicesStillToBePaid extends Component {
 
  constructor(props) {
    super(props);
  }

  renderInvoiceRow(invoice) {
    let letsplit = invoice.client ? invoice.client.split("\n")[0] : ''
    return (
      <div key={invoice._id} style={s.row}>
        <div style={s.col}>{invoice.invoiceNumber}</div>
        <div style={s.col}>{invoice.invoiceDate?.toString()}</div>
        <div style={s.col}>{invoice.label}</div>
        <div style={s.col}>{invoice.title}</div>
        <div style={s.col}>{letsplit}</div>
        <div style={Object.assign({textAlign: 'right'}, s.col)}>{invoice.invoicePrice()}</div>
      </div>
    )
  }

  calculatePriceToBePaid() {
    let totalPrice = 0;
    R.map((invoice) => totalPrice += invoice.invoicePrice(), this.props.invoicesStillToBePaid)
    return totalPrice;
  }

  render() {
    if ( ! this.props.invoicesStillToBePaid) return (<div />)
    return (
      <div style={s.base}>
        {R.map(this.renderInvoiceRow, this.props.invoicesStillToBePaid)}
        <div style={{textAlign: 'right'}}>{this.calculatePriceToBePaid()}</div>
      </div>
    );
  }
}

var s = {
  base: {
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  col: {
    flex: 1
  }
}

export default withTracker((props) => {
  return {
    invoicesStillToBePaid: Invoices.find({"meta.dateFullyPaid": null, "invoiceDate": { $gte: "2018-01-01" } }, {sort: {invoiceNumber: -1}}).fetch()
  }
})(InvoicesStillToBePaid);
