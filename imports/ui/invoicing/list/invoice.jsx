import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
 
class Invoice extends Component {
 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.base}>
        <div style={styles.col}>{this.props.invoice.invoiceDate}</div>
        <div style={styles.col}>{this.props.invoice.invoiceNumber}</div>
        <div style={styles.col}>{this.props.invoice.client}</div>
        <div style={styles.col}>{this.props.invoice.title}</div>
        <div style={styles.col}>{this.props.invoice.amount}</div>
        <div style={styles.col}>{this.props.invoice.paymentStatus}</div>
        <div style={styles.col}>{this.props.invoice.dateFullyPaid}</div>
      </div>
    );
  }

}

var styles = {
  base: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  col: {

  }
}

export default Invoice;
