import React, { Component } from 'react';

// Import models
import { Invoices } from '../../../api/invoices.js';

// Import styles
import Styles from '../../../style/common.jsx';
import FormStyles from '../../../style/form.jsx';

class ClientAddress extends Component {
 
  constructor(props) {
    super(props);
    this.clientInputRef = React.createRef();
  }

  // updateClient :: Event -> Invoice
  updateClient(e) {
    this.props.invoice.client = this.clientInputRef.current.value;
    this.forceUpdate();
    Invoices.update(this.props.invoice._id, Object.assign({}, this.props.invoice, {
      client: this.props.invoice.client
    }));
  }

  render() {
    const client = (this.props.invoice && this.props.invoice.client) ? this.props.invoice.client.replace("\n", '<br />').replace("\n", '<br />').replace("\n", '<br />') : '';
    return (
      <section style={Styles.flexCol}>
        <textarea ref={this.clientInputRef} value={this.props.invoice.client} onChange={this.updateClient.bind(this)} style={Object.assign({}, styles.clientInput, this.props.styles.hideWhilePrinting)}></textarea>
        <div className="firstLineBold" style={Object.assign({}, this.props.styles.showWhilePrinting)} dangerouslySetInnerHTML={{__html: client}} />
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

export default ClientAddress;
