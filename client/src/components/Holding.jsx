import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Holding = ({ data }) => {
  const { name, symbol, lastprice, currentprice, shares, costprice } = data;
  const calculatePriceChange = (lastP, currentP) => currentP - lastP;
  const calculateMktVal = (currentP, units) => currentP * units;
  const calculateGain = (currentP, units, cost) => calculatePriceChange(cost, currentP) * units;
  const calculateGainPercent = (currentP, units, cost) => Math.round(calculateGain(currentP, units, cost) / (cost * units) * 100);
  const calculateDayGain = (currentP, lastP, units) => calculatePriceChange(lastP, currentP) * units;
  const calculateDayGainPercent = (currentP, lastP) => (calculatePriceChange(lastP, currentP) / lastP).toFixed(2) * 100;

  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{symbol}</Table.Cell>
      <Table.Cell>{lastprice}</Table.Cell>
      <Table.Cell>{currentprice}</Table.Cell>
      <Table.Cell>{calculatePriceChange(lastprice, currentprice)}</Table.Cell>
      <Table.Cell>{shares}</Table.Cell>
      <Table.Cell>{costprice}</Table.Cell>
      <Table.Cell>{calculateMktVal(currentprice, shares)}</Table.Cell>
      <Table.Cell>{calculateGain(currentprice, shares, costprice)}</Table.Cell>
      <Table.Cell>{calculateGainPercent(currentprice, shares, costprice)}</Table.Cell>
      <Table.Cell>{calculateDayGain(currentprice, lastprice, shares)}</Table.Cell>
      <Table.Cell>{calculateDayGainPercent(currentprice, lastprice)}</Table.Cell>
    </Table.Row>
  );
};

Holding.propTypes = {
  data: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};


export default Holding;