import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment'

// Import models
import {Payments} from '../../models/Payments.js';

class Order extends Component {

  componentDidMount() {}

  insertPayment(data) {
    const callback = (err, res) => {
      if (err) {
        alert(err);
      } else {
        // Success!
        // ..
      }
    }
    Meteor.call('mollie.insertPayment', data, callback);
  }

  render() {
    // Thank you for your payment! Because you paid in between 10 days, you got 10% discount. I'm looking forward to a new project together. [name].
    return (
      <div style={s.base}>
        <p>
          Thank you for your payment! I'm looking forward to another project together.
        </p>
        <p>
          If you have any questions, don't hesitate to e-mail <a href="mailto:bart@tuxion.nl">bart@tuxion.nl</a> or app to <a href="tel:+31646386864">+31 6 463 86 864</a>.
        </p>
        <p>
          Tuxion
        </p>
      </div>
    )
  }

}

s = {
  base: {
    padding: '20px'
  }
}

Order.defaultProps = {
  payment: {},
  invoice: {}
}

export default createContainer((props) => {
  var payment;

  if(props.paymentId)
    payment = Payments.find({_id: props.paymentId}).fetch()[0]

  return {
    payment: payment
  }
}, Order);
