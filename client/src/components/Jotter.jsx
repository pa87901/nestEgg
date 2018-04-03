import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import Transaction from './Transaction';

const Jotter = ({ transactions }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="checkboxColumn">
          <Checkbox />
        </Table.HeaderCell>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Shares</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {transactions.map(transaction => <Transaction key={transaction.id} data={transaction} />)}
    </Table.Body>
  </Table>
);

Jotter.propTypes = {
  transactions: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions
});

export default connect(mapStateToProps, null)(Jotter);