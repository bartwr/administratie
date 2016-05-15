import React, { Component } from 'react';
 
// Import templates
import InvoicingController from './invoicing/InvoicingController.jsx';

// App component - represents the whole app
export default class App extends Component {
 
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }
}
