import React from 'react';
import { connect } from 'react-redux';
import { Table, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { selectTransaction } from '../actions/transactionActions';

const Transaction = ({ data, handleSelectTransaction, selectedTransactions }) => {
  const { symbol, transactiontype, date, shares, price, _id } = data;
  const select = () => { handleSelectTransaction(_id) };
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          onClick={select}
          checked={selectedTransactions.indexOf(_id) > -1}/>
      </Table.Cell>
      <Table.Cell>{symbol}</Table.Cell>
      <Table.Cell>{transactiontype}</Table.Cell>
      <Table.Cell>{date.slice(0, 10)}</Table.Cell>
      <Table.Cell>{shares}</Table.Cell>
      <Table.Cell>{price}</Table.Cell>
    </Table.Row>
  );
};

Transaction.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  selectedTransactions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  handleSelectTransaction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedTransactions: state.transactions.selectedTransactions
});

const mapDispatchToProps = dispatch => ({
  handleSelectTransaction(id) {
    dispatch(selectTransaction(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);