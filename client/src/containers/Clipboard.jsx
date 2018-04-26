import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import Jotter from '../components/Jotter';
import Ticket from '../components/Ticket';
import {
  setTransactions,
  removeTransactions
} from '../actions/transactionActions';


class Clipboard extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

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

  delete() {
    const { selectedTransactions, handleRemoveTransactions } = this.props;
    if (!selectedTransactions.length) {
      window.alert('No transactions selected. Please select transactions by checkboxes.');
    }
    handleRemoveTransactions(selectedTransactions);
  }

  render() {
    const { selectedTransactions } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <h2>Transactions</h2>
          <Jotter />
        </Segment>
        <Segment className="portfolioButtonRow">
          <Ticket />
          <Button
            basic
            color={selectedTransactions.length ? "red" : null}
            onClick={this.delete}>
            Delete
          </Button>
        </Segment>
      </Segment.Group>
    );
  }
}

Clipboard.propTypes = {
  handleSetTransactions: PropTypes.func.isRequired,
  selectedTransactions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  handleRemoveTransactions: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  selectedTransactions: state.transactions.selectedTransactions
});

const mapDispatchToProps = dispatch => ({
  handleSetTransactions(transactions) {
    dispatch(setTransactions(transactions));
  },
  handleRemoveTransactions(transactions) {
    dispatch(removeTransactions(transactions))
  }
});

export const Unwrapped = Clipboard;
export default connect(mapStateToProps, mapDispatchToProps)(Clipboard);