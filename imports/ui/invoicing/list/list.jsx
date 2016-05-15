import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
 
// Import models
import { Invoices } from '../../../api/invoices.js';

// Import templates
import Invoice from './invoice.jsx';

class List extends Component {
 
  constructor(props) {
    super(props);
  }

  renderInvoices() {
    return this.props.invoices.map((invoice) => (
      <Invoice key={invoice._id} invoice={invoice} />
    ));
  }

  handleSubmit(e) {
    e.preventDefault();

    const field = ReactDOM.findDOMNode(this.refs.textInput);
    const title = field.value.trim();

    Invoices.insert({
      title: title
    });

    field.value = '';
  }

  render() {
    return (
      <div>
        <header>
          <form onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" ref="textInput" placeholder="Type een titel om een nieuwe factuur toe te voegen"
            />
          </form>
        </header>
        {this.renderInvoices()}
      </div>
    );
  }

}

export default List;
