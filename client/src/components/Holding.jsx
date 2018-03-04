import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Holding = ({ data }) => {
  const { name, symbol, lastPrice, currentPrice, shares, costPrice } = data;
  const calculatePriceChange = (lastP, currentP) => currentP - lastP;
  const calculateMktVal = (currentP, units) => currentP * units;
  const calculateGain = (currentP, units, cost) => calculatePriceChange(cost, currentPrice) * units;
  const calculateGainPercent = (currentP, units, cost) => Math.round(calculateGain(currentP,units, cost) / cost);
  const calculateDayGain = (currentP, lastP, units) => calculatePriceChange(lastP, currentP) * units;
  const calculateDayGainPercent = (currentP, lastP) => (calculatePriceChange(lastP, currentP) / lastP).toFixed(2) * 100;

  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{symbol}</Table.Cell>
      <Table.Cell>{lastPrice}</Table.Cell>
      <Table.Cell>{currentPrice}</Table.Cell>
      <Table.Cell>{calculatePriceChange(lastPrice, currentPrice)}</Table.Cell>
      <Table.Cell>{shares}</Table.Cell>
      <Table.Cell>{costPrice}</Table.Cell>
      <Table.Cell>{calculateMktVal(currentPrice, shares)}</Table.Cell>
      <Table.Cell>{calculateGain(currentPrice, shares, costPrice)}</Table.Cell>
      <Table.Cell>{calculateGainPercent(currentPrice, shares, costPrice)}</Table.Cell>
      <Table.Cell>{calculateDayGain(currentPrice, lastPrice, shares)}</Table.Cell>
      <Table.Cell>{calculateDayGainPercent(currentPrice, lastPrice)}</Table.Cell>
    </Table.Row>
  );
};

Holding.propTypes = {
  data: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};



export default Holding;