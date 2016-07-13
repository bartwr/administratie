import Radium from 'radium';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import $ from 'jquery';

// Import models
import { InvoiceRows }  from '../../../api/invoice-rows.js';

// Import styles
import Styles from '../../../style/common.jsx';
import FormStyles from '../../../style/form.jsx';

// Import templates
import InvoiceRow from './invoice-row';
import ClientAddress from './client-address';
import ProviderAddress from './provider-address';

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
      invoiceId: this.props.invoice._id,
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

  // printInvoice :: Event -> Action downloadPDF
  printInvoice(e) {
    e.preventDefault();
    return xepOnline.Formatter.Format('invoice-to-print',{render:'download'});
  }

  // calculateRowPrice :: ? -> ?
  calculateRowPrice() { this.refs.rowPrice.value = this.refs.numberOf.value * this.refs.basePrice.value }

  // handleNumberOfChange :: Event -> ?
  handleNumberOfChange(e) { this.calculateRowPrice() }

  // handleBasePriceChange :: Event -> ?
  handleBasePriceChange(e) { this.calculateRowPrice() }

  // closeInvoice
  closeInvoice(e) {
    if($(e.target).closest('#invoice-to-print').length <= 0){
      this.props.closeInvoice();
    }
  }

  render() {
    return (
      <div style={styles.overlay} onClick={this.closeInvoice.bind(this)}>
        <div style={styles.invoice} id="invoice-to-print">
          <div style={{flex: 1}}>

            <div style={Styles.flexRow}>
              <ClientAddress invoice={this.props.invoice} styles={styles} />
              <ProviderAddress invoice={this.props.invoice} styles={styles}  />
            </div>

            <section ref="invoiceRows" style={Object.assign({}, styles.flexRow, styles.invoiceRows)}>

              <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow)}>
                <label style={Object.assign({}, styles.label, styles.descriptionRow)}>Omschrijving</label>
                <label style={Object.assign({}, styles.label, styles.priceRow)}>Bedrag</label>
              </div>
              {this.renderInvoiceRows()}
              <form onSubmit={this.handleInvoiceRowSubmit.bind(this)} style={Object.assign({}, styles.form, styles.hideWhilePrinting)}>
                <input type="text" ref="title" placeholder="title" style={Object.assign({}, FormStyles.input, styles.input)} />
                <input ref="numberOf" type="number" ref="numberOf" placeholder="numberOf" onChange={this.handleNumberOfChange.bind(this)} style={Object.assign({}, FormStyles.input, styles.input)} />
                <input ref="basePrice" type="number" step="0.01" ref="basePrice" placeholder="basePrice" onChange={this.handleBasePriceChange.bind(this)} style={Object.assign({}, FormStyles.input, styles.input)} />
                <input ref="rowPrice" type="number" step="0.01" ref="rowPrice" placeholder="rowPrice" style={Object.assign({}, FormStyles.input, styles.input)} />
                <button type="submit" style={Object.assign({}, FormStyles.input, styles.input)}>v</button>
              </form>

              <div style={styles.invoiceEndRows}>
                <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow, {borderBottom: 'none'})}>
                  <label style={styles.label}>Subtotaal</label>
                  <div>&euro; {this.formatPrice(this.props.invoice.invoicePrice())}</div>
                </div>
                <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow, {borderBottom: 'solid #E8E8E8 2px'})}>
                  <label style={styles.label}>Totaal btw 21%</label>
                  <div>&euro; {this.formatPrice(this.props.invoice.invoicePrice() * 0.21)}</div>
                </div>
                <div style={Object.assign({}, Styles.flexRow, styles.invoiceRow, {borderBottom: 'none'})}>
                  <label style={styles.label}>Totaal incl. btw</label>
                  &euro; {this.formatPrice(this.props.invoice.invoicePrice() * 1.21)}
                </div>
              </div>

            </section>

            <section ref="endText" style={Object.assign({}, styles.endText)}>
              Gelieve het bedrag van <b>&euro; {this.formatPrice(this.props.invoice.invoicePrice() * 1.21)}</b> over te maken naar rekeningnummer <b>NL38 TRIO 0776 4815 41</b><br />
              ten name van <b>Tuxion</b>, onder vermelding van factuurnummer <b>{this.props.invoice.invoiceNumber}.</b>
            </section>

          </div>

          <footer ref="footer" style={Object.assign({}, Styles.flexRow, styles.footer)}>
            <div style={Styles.flexCol}>
              <b>Tuxion</b><br />
              +31 (0) 6 46 38 68 64
            </div>
            <div style={Styles.flexCol}>
              bart@tuxion.nl<br />
              www.tuxion.nl
            </div>
            <div style={Styles.flexCol}>
              Koediefstraat 2<br />
              2511 CG&nbsp;&nbsp;Den Haag
            </div>
            <div style={Styles.flexCol}>
              BTW NL048828889B01<br />
              KVK 24371485
            </div>
          </footer>

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
    '@media print': {
    }
  },
  invoice: {
    width: '100%',
    position: 'relative',
    maxWidth: '900px',
    height: 'calc(100vh - 5%)',
    margin: '5% auto 0 auto',
    overflow: 'hidden',
    padding: '210px 80px 56px 80px',/* 20px + 36px used by footer = 56px */
    backgroundColor: '#fff',
    backgroundImage: 'url(/Logo-tuxionzwart_puntblauw_slogan.png)',
    backgroundPosition: '80px 56px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '180px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    '@media print': {
      height: '100vh',
      margin: '0',
      padding: '165px 40px 56px 40px',
      backgroundPosition: '40px 26px',
      backgroundSize: '180px',
      maxHeight: '980px'
    }
  },
  label: {
    fontWeight: 'bold',
    display: 'inline-block',
    width: '130px',
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
    marginTop: '37px',
    width: '50%',
    alignSelf: 'flex-end'
  },
  endText: {
    position: 'absolute',
    right: '20px',
    bottom: '100px',
    left: '80px',
    '@media print': {
      right: '20px',
      bottom: '80px',
      left: '20px',
    }
  },
  footer: {
    display: 'flex',
    fontSize: '10px',
    lineHeight: '14px',
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    left: '80px',
    overflow: 'none',
    '@media print': {
      right: '20px',
      bottom: '0',
      left: '20px',
    }
  },
  hideWhilePrinting: {
    '@media print': {
      display: 'none'
    }
  },
  showWhilePrinting: {
    display: 'none',
    '@media print': {
      display: 'block'
    }
  }
}

export default Radium(Invoice);
