import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import Jotter from '../components/Jotter';
import Ticket from '../components/Ticket';
import { setTransactions } from '../actions/transactionActions';


class Clipboard extends Component {
  componentWillMount() {
    const { handleSetTransactions } = this.props;
    fetch('http://localhost:3000/api/transactions', { method: 'get' })
    .then(transactions => transactions.json())
    .then(transactionsJSON => {
      handleSetTransactions(transactionsJSON);
    })
    .catch(err => {
      console.error('Unable to get all transactions from the backend:', err); // eslint-disable-line no-console
    });
  }

  render() {
    return (
      <Segment.Group>
        <Segment>
          <h2>Transactions</h2>
          <Jotter />
        </Segment>
        <Segment>
          <Ticket />
        </Segment>
      </Segment.Group>
    );
  }
}

Clipboard.propTypes = {
  handleSetTransactions: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleSetTransactions(transactions) {
    dispatch(setTransactions(transactions));
  }
});

export const Unwrapped = Clipboard;
export default connect(null, mapDispatchToProps)(Clipboard);