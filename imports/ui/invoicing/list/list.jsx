import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
 
// Import models
import { Invoices } from '../../../api/invoices.js';

// Import styles
import FormStyles from '../../../style/form.jsx';

// Import templates
import Invoice from './invoice.jsx';

class List extends Component {
 
  constructor(props) {
    super(props);
  }

  /**
   * Render invoices
   * After each month there's a monthTotal
   */
  renderInvoices() {
    var self = this, month = null, monthSum = 0;

    return this.props.invoices.map((invoice) => {

      let elementsToReturn = [];

      if ( month != new Date(invoice.invoiceDate).getMonth() ) {

        elementsToReturn.push(
          <div style={{textAlign: 'right'}}><b>Total this month: {monthSum} &euro;</b></div>
        );

        // Set current month.
        month = new Date(invoice.invoiceDate).getMonth();

        // Rest monthSum.
        monthSum = 0;
      }

      monthSum += invoice.invoicePrice();

      elementsToReturn.push(
        <Invoice key={invoice._id} invoice={invoice} viewInvoice={self.props.viewInvoice.bind(self)} closeInvoice={self.props.closeInvoice.bind(self)} />
      );

      return elementsToReturn;

    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const field = ReactDOM.findDOMNode(this.refs.textInput);
    const invoiceNumber = field.value.trim();

    Invoices.insert({
      createdAt: new Date(),
      invoiceDate: '',
      invoiceNumber: invoiceNumber
    });

    field.value = '';
  }

  render() {
    return (
      <div style={styles.base}>
        <header>
          <form onSubmit={this.handleSubmit.bind(this)} style={styles.form}>
            <input type="text" ref="textInput" placeholder="Typ een factuurnummer om een factuur toe te voegen" style={Object.assign({}, FormStyles.input, styles.input)}
            />
          </form>
        </header>
        {this.renderInvoices()}
      </div>
    );
  }

}

var styles = {
  base: {
    '@media print': {
      // display: 'none'
    }
  },
  input: {
    width: '100%',
  },
}

export default List;
