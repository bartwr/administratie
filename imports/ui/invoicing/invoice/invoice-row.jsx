import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

// Import models
import { InvoiceRows } from '/imports/api/invoice-rows.js';

// Import styles
import Styles from '../../../style/common.jsx';

class InvoiceRow extends Component {
 
  constructor(props) {
    super(props);
  }

  formatPrice(price) {
    return parseFloat(price).toFixed(2);
  }

  // deleteThisInvoice :: Event -> [1,0]
  deleteThisInvoiceRow(e) {
    this.props.deleteInvoiceRow(this.props.invoice._id)
  }

  render() {
    const rowPrice = this.props.invoice.rowPrice == 0 ? '' : this.formatPrice(this.props.invoice.rowPrice)
    return (
      <div style={Object.assign({}, Styles.flexRow, this.props.styles.invoiceRow)}>
        <div style={Object.assign({}, this.props.styles.descriptionRow)}>
          <button style={this.props.styles.hideWhilePrinting} onClick={this.deleteThisInvoiceRow.bind(this)}>&times;</button>
          <span onClick={() => this.props.newTitle(this.props.invoice)}>{this.props.invoice.title}</span>
        </div>
        <div style={Object.assign({}, this.props.styles.priceRow)} onClick={() => this.props.newRowPrice(this.props.invoice)}>
          {rowPrice}
        </div>
      </div>
    );
  }

}

export default InvoiceRow;
