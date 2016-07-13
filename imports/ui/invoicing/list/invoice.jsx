import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Radium from 'radium';

// Import models
import { Invoices } from '../../../api/invoices.js';
 
class Invoice extends Component {
 
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    invoiceId = document.location.pathname.split('/')[2];
    if(invoiceId != undefined && invoiceId == this.props.invoice._id){
      this.viewThisInvoice();
    }
  }

  // viewThisInvoice :: Event -> ?
  viewThisInvoice() { this.props.viewInvoice(this.props.invoice) }

  // deleteThisInvoice :: Event -> 1/0
  deleteThisInvoice() { if(confirm('Sure?')) Invoices.remove(this.props.invoice._id); }

  render() {
    return (
      <div className="invoice" data-id={this.props.invoice._id} style={styles.base}>
        <div style={styles.col}>{this.props.invoice.invoiceNumber}</div>
        <div style={styles.col}>{this.props.invoice.client}</div>
        <div style={styles.col}>{this.props.invoice.title}</div>
        <div style={styles.col}>{this.props.invoice.amount}</div>
        <div style={styles.col}>{this.props.invoice.paymentStatus}</div>
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
    padding: '5px 5px',
    ':hover': {
      backgroundColor: '#ccc'
    }
  },
  col: {
    flex: 1
  }
}

export default Radium(Invoice);
