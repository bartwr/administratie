import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// Import models
import { InvoiceRows }  from '../../../api/invoice-rows.js';

// Import styles
import Styles from '../../../style/common.jsx';
import FormStyles from '../../../style/form.jsx';

// Import templates
import InvoiceRow from './invoice-row';

class Invoice extends Component {
 
  constructor(props) {
    super(props);
  }

  formatPrice(price) {
    return parseFloat(price).toFixed(2);
  }

  // renderInvoiceRows :: ? -> Component False
  renderInvoiceRows() {
    var self = this;
    if( ! this.props.invoice.invoiceRows() ) return false;
    return this.props.invoice.invoiceRows().map((invoice) => (
      <InvoiceRow key={invoice._id} invoice={invoice} formatPrice={self.props.formatPrice} deleteInvoiceRow={this.deleteInvoiceRow.bind(this)} styles={styles} />
    ));
  }

  // getFieldValue :: String refName -> String value
  getFieldValue(refName){
    const field = ReactDOM.findDOMNode(this.refs[refName]);
    return field.value.trim();
  }

  // handleInvoiceRowSubmit :: Event -> ?
  handleInvoiceRowSubmit(e) {
    e.preventDefault();

    InvoiceRows.insert({
      invoiceId: this.props.invoice._id._str,
      title: this.getFieldValue('title'),
      numberOf: this.getFieldValue('numberOf'),
      basePrice: this.getFieldValue('basePrice'),
      rowPrice: this.getFieldValue('rowPrice'),
    });

    this.forceUpdate();
  }

  // deleteInvoiceRow :: String _id -> [0,1]
  deleteInvoiceRow(_id) {
    InvoiceRows.remove(_id);
    this.forceUpdate();
  }

  render() {
    return (
      <div style={styles.overlay}>
        <div style={styles.invoice}>

          <div style={Styles.flexRow}>

            <section ref="clientAddress" style={Styles.flexCol}>
              <b>{this.props.invoice.client}</b>
            </section>

            <section ref="providerAddress" style={Styles.flexCol}>
              
              <label style={styles.label}>Factuurnummer</label>
              {this.props.invoice.invoiceNumber}
              <br />
              
              <label style={styles.label}>Factuurdatum</label>
              {this.props.invoice.invoiceDate}
              <br />
              
              <label style={styles.label}>Periode</label>
              ..
              <br />
              
              <label style={styles.label}>Betreft</label>
              {this.props.invoice.title}
              <br />

            </section>
          </div>

          <section ref="invoiceRows" style={Object.assign({}, styles.flexRow, styles.invoiceRows)}>

            <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow)}>
              <label style={Object.assign({}, styles.label, styles.descriptionRow)}>Omschrijving</label>
              <label style={Object.assign({}, styles.label, styles.priceRow)}>Bedrag</label>
            </div>
            {this.renderInvoiceRows()}
            <form onSubmit={this.handleInvoiceRowSubmit.bind(this)} style={styles.form}>
              <input type="text" ref="title" placeholder="title" style={Object.assign({}, FormStyles.input, styles.input)} />
              <input type="number" ref="numberOf" placeholder="numberOf" style={Object.assign({}, FormStyles.input, styles.input)} />
              <input type="number" step="0.01" ref="basePrice" placeholder="basePrice" style={Object.assign({}, FormStyles.input, styles.input)} />
              <input type="number" step="0.01" ref="rowPrice" placeholder="rowPrice" style={Object.assign({}, FormStyles.input, styles.input)} />
              <button type="submit" style={Object.assign({}, FormStyles.input, styles.input)}>v</button>
            </form>

            <div style={styles.invoiceEndRows}>
              <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow, {borderBottom: 'none'})}>
                <label style={styles.label}>Subtotaal</label>
                <div>&euro; {this.formatPrice(this.props.invoice.amount)}</div>
              </div>
              <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow, {borderBottom: 'solid #E8E8E8 2px'})}>
                <label style={styles.label}>Totaal btw 21%</label>
                <div>&euro; {this.formatPrice(this.props.invoice.amount * 0.21)}</div>
              </div>
              <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow, {borderBottom: 'none'})}>
                <label style={styles.label}>Totaal incl. btw</label>
                <div>&euro; {this.formatPrice(this.props.invoice.amount * 1.21)}</div>
              </div>
            </div>

          </section>

        </div>
      </div>
    );
  }

}

var styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
  },
  invoice: {
    width: '100%',
    maxWidth: '900px',
    height: 'calc(100% - 5%)',
    margin: '5% auto 0 auto',
    padding: '210px 80px 20px 80px',
    background: '#fff',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '24px',
  },
  label: {
    fontWeight: 'bold',
    display: 'inline-block',
    width: '200px',
  },
  invoiceRows: {
    marginTop: '47px',
    lineHeight: '24px',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column'
  },
  invoiceRow: {
    borderBottom: 'solid #F6F6F6 2px'
  },
  descriptionRow: {
  },
  priceRow: {
    maxWidth: '100px',
    textAlign: 'right'
  },
  invoiceEndRows: {
    width: '280px',
    alignSelf: 'flex-end'
  },
}

export default Invoice;
