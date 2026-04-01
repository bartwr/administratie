import React, { Component } from 'react';

// Import models
import { Invoices } from '../../../api/invoices.js';

// Import styles
import Styles from '../../../style/common.jsx';
import FormStyles from '../../../style/form.jsx';

class ProviderAddress extends Component {
 
  constructor(props) {
    super(props);
    this.invoiceNumberRef = React.createRef();
    this.invoiceDateRef = React.createRef();
    this.labelRef = React.createRef();
    this.titleRef = React.createRef();
  }

  // updateClient :: Event -> Invoice
  updateClient(e) {
    this.props.invoice.client = this.refs.clientInput.value;
    this.forceUpdate();
    Invoices.update(this.props.invoice._id, {
      title: this.props.invoice.title,
      client: this.props.invoice.client
    });
  }

  // handleChange: Event -> ?
  handleChange(e) {

    e.preventDefault();

    this.props.invoice.invoiceNumber = this.invoiceNumberRef.current.value;
    this.props.invoice.label = this.labelRef.current.value;
    this.props.invoice.title = this.titleRef.current.value;
    if(this.invoiceDateRef.current.value){
      this.props.invoice.invoiceDate = this.invoiceDateRef.current.value;
    }

    Invoices.update(this.props.invoice._id, this.props.invoice);

    this.forceUpdate();

  }

  render() {
    const invoiceDate = (this.props.invoice && this.props.invoice.invoiceDate && typeof this.props.invoice.invoiceDate.getFullYear === 'function')
                    ? this.props.invoice.invoiceDate.getFullYear()+'-'+('0'+this.props.invoice.invoiceDate.getMonth()).slice(-2)+'-'+this.props.invoice.invoiceDate.getDate()
                    : this.props.invoice.invoiceDate;

    return (
      <section style={Styles.flexCol}>
        
        <div style={this.props.styles.hideWhilePrinting}>

          <label style={this.props.styles.label}>Factuurnummer</label>
          <input ref={this.invoiceNumberRef} value={this.props.invoice.invoiceNumber} onChange={this.handleChange.bind(this)} style={Object.assign({}, FormStyles.input, this.props.styles.input)} />

          <label style={this.props.styles.label}>Factuurdatum</label>
          <input ref={this.invoiceDateRef} type="text" value={invoiceDate} onChange={this.handleChange.bind(this)} style={Object.assign({}, FormStyles.input, this.props.styles.input)} />

          <label style={this.props.styles.label}>Periode</label>
          <input ref={this.labelRef} value={this.props.invoice.label} onChange={this.handleChange.bind(this)} style={Object.assign({}, FormStyles.input, this.props.styles.input)} />
          
          <label style={this.props.styles.label}>Betreft</label>
          <input ref={this.titleRef} value={this.props.invoice.title} onChange={this.handleChange.bind(this)} style={Object.assign({}, FormStyles.input, this.props.styles.input)} />

        </div>

        <div style={this.props.styles.showWhilePrinting}>

          <label style={this.props.styles.label}>Factuurnummer</label>
          {this.props.invoice.invoiceNumber}
          <br />
          
          <label style={this.props.styles.label}>Factuurdatum</label>
          {invoiceDate}
          <br />
          
          <label style={this.props.styles.label}>Periode</label>
          {this.props.invoice.label}
          <br />
          
          <label style={this.props.styles.label}>Betreft</label>
          {this.props.invoice.title}
          <br />

        </div>

      </section>
    );
  }

}

var styles = {
  clientInput: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
    height: '100px',
    border: 'none',
    width: '100%',
  },
  firstLineBold: {
    '::firstLine': {
      fontWeight: 'bold'
    }
  }
}

export default ProviderAddress;
