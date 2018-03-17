import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import 'isomorphic-fetch';
import Blotter from '../components/Blotter';
import Ticket from '../components/Ticket';
import Jotter from '../components/Jotter';
import { setHoldings, removeBookings } from '../actions/holdingActions';
import { setTransactions } from '../actions/transactionActions';


class Portfolio extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    const { handleSetHoldings, handleSetTransactions } = this.props;
    fetch('http://localhost:3000/api/holdings', { method: 'get' })
    .then(holdings => holdings.json())
    .then(holdingsJSON => {
      handleSetHoldings(holdingsJSON);
    })
    .catch(err => {
      console.error('Unable to get all holdings from the backend:', err); // eslint-disable-line no-console
    });

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
    const { selected, handleRemoveBookings } = this.props;
    const payload = { selected };
    const headers = {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    };
    const init = {
      method: 'DELETE',
      headers,
      mode: 'cors',
      body: JSON.stringify(payload),
      json: true
    };
    fetch('/api/holdings/', init)
    .then(res => res.json())
    .then(resJSON => {
      handleRemoveBookings(resJSON.rows);
    })
    .catch(err => {
      console.error('Error sending ids to delete:', err); // eslint-disable-line no-console
    });
  }

  render() {
    const { selected } = this.props;
    return (
      <div>
        <h1>Nest Egg World</h1>
        <div className="blotter-container">
          <Segment.Group className="blotter">
            <Segment>
              <Blotter />
            </Segment>
            <Segment className="portfolioButtonRow" >
              <Button
                basic
                color={selected.length ? "red" : null}
                onClick={this.delete}>
                  Delete
              </Button>
            </Segment>
            <Segment>
              <Jotter />
            </Segment>
            <Segment>
              <Ticket />
            </Segment>
          </Segment.Group>
        </div>
      </div>
    );
  }
}

Portfolio.propTypes = {
  handleSetHoldings: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  handleRemoveBookings: PropTypes.func.isRequired,
  handleSetTransactions: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  selected: state.holdings.selected
});

const mapDispatchToProps = dispatch => ({
  handleSetHoldings(holdings) {
    dispatch(setHoldings(holdings))
  },
  handleRemoveBookings(holdings) {
    dispatch(removeBookings(holdings));
  },
  handleSetTransactions(transactions) {
    dispatch(setTransactions(transactions));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);