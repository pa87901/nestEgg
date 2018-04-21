import React from 'react';
import { connect } from 'react-redux';
import { Table, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { selectHolding } from '../actions/holdingActions';

const Holding = ({ name, symbol, lastprice, currentprice, shares, costprice, handleSelectHolding, selectedHoldings }) => {
  // const { id, name, symbol, lastprice, currentprice, shares, costprice } = data;
  // console.log('DATA:', data);
  const calculatePriceChange = (lastP, currentP) => Math.round(currentP - lastP, 2);
  const calculateMktVal = (currentP, units) => currentP * units;
  const calculateGain = (currentP, units, cost) => calculatePriceChange(cost, currentP) * units;
  const calculateGainPercent = (currentP, units, cost) => Math.round(calculateGain(currentP, units, cost) / (cost * units) * 100);
  const calculateDayGain = (currentP, lastP, units) => calculatePriceChange(lastP, currentP) * units;
  const calculateDayGainPercent = (currentP, lastP) => (calculatePriceChange(lastP, currentP) / lastP).toFixed(2) * 100;
  const select = () => { handleSelectHolding(symbol) };

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          onClick={select}
          checked={selectedHoldings.indexOf(symbol) > -1} />
      </Table.Cell>
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
  // data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  // id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  lastprice: PropTypes.number.isRequired,
  currentprice: PropTypes.number.isRequired,
  shares: PropTypes.number.isRequired,
  costprice: PropTypes.number.isRequired,
  handleSelectHolding: PropTypes.func.isRequired,
  selectedHoldings: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  selectedHoldings: state.holdings.selectedHoldings
});

const mapDispatchToProps = dispatch => ({
  handleSelectHolding(symbol) {
    dispatch(selectHolding(symbol));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Holding);