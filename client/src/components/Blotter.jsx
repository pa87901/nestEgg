import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import Holding from './Holding';

const Blotter = ({ holdings }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell><Checkbox /></Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Last price</Table.HeaderCell>
        <Table.HeaderCell>Current price</Table.HeaderCell>
        <Table.HeaderCell>Change</Table.HeaderCell>
        <Table.HeaderCell>Shares</Table.HeaderCell>
        <Table.HeaderCell>Cost price</Table.HeaderCell>
        <Table.HeaderCell>Mkt value</Table.HeaderCell>
        <Table.HeaderCell>Gain</Table.HeaderCell>
        <Table.HeaderCell>Gain %</Table.HeaderCell>
        <Table.HeaderCell>Day&#39;s gain</Table.HeaderCell>
        <Table.HeaderCell>Day &#39;s gain %</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {holdings.map(holding => <Holding key={holding.symbol} data={holding} />)}
    </Table.Body>

    {/*
    <Table.Footer>
    </Table.Footer>
    */}
  </Table>
);

Blotter.propTypes = {
  holdings: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  holdings: state.holdings.holdings
});

export default connect(mapStateToProps, null)(Blotter);