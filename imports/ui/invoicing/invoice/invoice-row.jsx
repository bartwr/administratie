import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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
    return (
      <div style={Object.assign({}, Styles.flexRow, this.props.styles.invoiceRow)}>
        <div style={Object.assign({}, this.props.styles.descriptionRow)}>
          <button onClick={this.deleteThisInvoiceRow.bind(this)}>&times;</button>
          {this.props.invoice.title}
        </div>
        <div style={Object.assign({}, this.props.styles.priceRow)}>
          {this.formatPrice(this.props.invoice.rowPrice)}
        </div>
      </div>
    );
  }

}

var styles = {
}

export default InvoiceRow;
