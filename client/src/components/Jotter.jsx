import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import Transaction from './Transaction';
import { selectAllTransactions } from '../actions/transactionActions';

const Jotter = ({ transactions, handleSelectAllTransactions, selectedTransactions }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="checkboxColumn">
          <Checkbox
            onClick={handleSelectAllTransactions}
            checked={transactions.length === selectedTransactions.length && !!transactions.length}/>
        </Table.HeaderCell>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Shares</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {transactions.map(transaction => {
        const id = transaction._id; // eslint-disable-line no-underscore-dangle
        return (
          <Transaction key={id} data={transaction} />
        )
      })}
    </Table.Body>
  </Table>
);

Jotter.propTypes = {
  transactions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  handleSelectAllTransactions: PropTypes.func.isRequired,
  selectedTransactions: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  selectedTransactions: state.transactions.selectedTransactions
});

const mapDispatchToProps = dispatch => ({
  handleSelectAllTransactions() {
    dispatch(selectAllTransactions());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Jotter);