import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import $ from 'jquery';

// Import models
import { Invoices } from '../../../api/invoices.js';
 
class Invoice extends Component {
 
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.viewThisInvoice();
  }

  // viewThisInvoice :: Event -> ?
  viewThisInvoice() { this.props.viewInvoice(this.props.invoice) }

  // deleteThisInvoice :: Event -> 1/0
  deleteThisInvoice() { if(confirm('Sure?')) Invoices.remove(this.props.invoice._id); }

  render() {
    return (
      <div className="invoice" style={styles.base}>
        <div style={styles.col}>{this.props.invoice.invoiceDate}</div>
        <div style={styles.col}>{this.props.invoice.invoiceNumber}</div>
        <div style={styles.col}>{this.props.invoice.client}</div>
        <div style={styles.col}>{this.props.invoice.title}</div>
        <div style={styles.col}>{this.props.invoice.amount}</div>
        <div style={styles.col}>{this.props.invoice.paymentStatus}</div>
        <div style={styles.col}>{this.props.invoice.dateFullyPaid}</div>
        <div style={styles.col}>
          <button onClick={this.viewThisInvoice.bind(this)}>&raquo;</button>
        </div>
        <div style={styles.col}>
          <button onClick={this.deleteThisInvoice.bind(this)}>&times;</button>
        </div>
      </div>
    );
  }

}

var styles = {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 5px'
  },
  col: {
    flex: 1
  }
}

export default Invoice;
