import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import 'isomorphic-fetch';
import Blotter from '../components/Blotter';
import Ticket from '../components/Ticket';
import { setHoldings } from '../actions/holdingActions';


class Portfolio extends Component {
  componentWillMount() {
    const { handleSetHoldings } = this.props;
    fetch('http://localhost:3000/api/holdings', { method: 'get' })
    .then(holdings => holdings.json())
    .then(holdingsJSON => {
      handleSetHoldings(holdingsJSON);
    })
    .catch(err => {
      console.error('Unable to get all holdings from the backend:', err); // eslint-disable-line no-console
    });
  }

  render() {
    return (
      <div>
        <h1>Nest Egg World</h1>
        <div className="blotter-container">
          <Segment.Group className="blotter">
            <Segment>
              <Blotter />
            </Segment>
            <Segment>
              <Ticket />
            </Segment>
            <Segment>Marmite</Segment>
          </Segment.Group>
        </div>
      </div>
    );
  }
}

Portfolio.propTypes = {
  handleSetHoldings: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleSetHoldings(holdings) {
    dispatch(setHoldings(holdings))
  }
});

export default connect(null, mapDispatchToProps)(Portfolio);