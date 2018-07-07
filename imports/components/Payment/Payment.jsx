import React, { Component } from 'react'

class Payment extends Component {

  componentDidMount() {
    this.pay();
  }

  pay() {
    Meteor.call('mollie.doPayment', {
      info1: 'value1'
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        window.location = res.paymentUrl
      }
    });

  }

  render() {
    return (
      <div style={s.base}>
        Pay day
      </div>
    )
  }

}

s = {
  base: {
    padding: '20px'
  }
}

module.exports = Payment
