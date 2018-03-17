import React from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Transaction = ({ data }) => {
  const { symbol, transactiontype, date, shares, price } = data;
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox />
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
  data: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Transaction;