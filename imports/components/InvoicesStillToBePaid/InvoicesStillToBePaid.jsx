import Radium, { StyleRoot } from 'radium';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import R from 'ramda';
 
// Import models
import { Invoices } from '../../api/invoices.js';

class InvoicesStillToBePaid extends Component {
 
  constructor(props) {
    super(props);
  }

  renderInvoiceRow(invoice) {
    return (
      <div key={invoice._id} style={s.row}>
        <div style={s.col}>{invoice.invoiceNumber}</div>
        <div style={s.col}>{invoice.invoiceDate}</div>
        <div style={s.col}>{invoice.label}</div>
        <div style={s.col}>{invoice.title}</div>
        <div style={s.col}>{invoice.client.split("\n")[0]}</div>
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
    if ( ! this.props.invoicesStillToBePaid) return <div />
    console.log(this.props.invoicesStillToBePaid);
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

InvoicesStillToBePaid.propTypes = {
  invoices: PropTypes.string.isRequired
};

export default createContainer((props) => {
  return {
    invoicesStillToBePaid: Invoices.find({"meta.dateFullyPaid": null}, {sort: {invoiceNumber: -1}}).fetch()
  }
}, Radium(InvoicesStillToBePaid));
