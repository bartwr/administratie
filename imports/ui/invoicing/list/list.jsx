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

  renderInvoices() {
    var self = this;
    return this.props.invoices.map((invoice) => (
      <Invoice key={invoice._id} invoice={invoice} viewInvoice={self.props.viewInvoice.bind(self)} closeInvoice={self.props.closeInvoice.bind(self)} />
    ));
  }

  handleSubmit(e) {
    e.preventDefault();

    const field = ReactDOM.findDOMNode(this.refs.textInput);
    const title = field.value.trim();

    Invoices.insert({
      createdAt: new Date(),
      invoiceDate: new Date(),
      title: title
    });

    field.value = '';
  }

  render() {
    return (
      <div>
        <header>
          <form onSubmit={this.handleSubmit.bind(this)} style={styles.form}>
            <input type="text" ref="textInput" placeholder="Typ een titel om een factuur toe te voegen" style={Object.assign({}, FormStyles.input, styles.input)}
            />
          </form>
        </header>
        {this.renderInvoices()}
      </div>
    );
  }

}

var styles = {
  input: {
    width: '100%',
  }
}

export default List;
