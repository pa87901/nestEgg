import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import Holding from './Holding';
import { selectAllHoldings } from '../actions/holdingActions';

const Blotter = ({ holdings, handleSelectAllHoldings, selected }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="checkboxColumn">
          <Checkbox
            onClick={handleSelectAllHoldings}
            checked={holdings.length === selected.length && !!holdings.length}/>
        </Table.HeaderCell>
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
      {holdings.map(holding => (
        <Holding
          key={holding.symbol}
          // data={holding}
          // id={holding.id}
          name={holding.name}
          symbol={holding.symbol}
          lastprice={holding.lastprice}
          currentprice={holding.currentprice}
          shares={holding.shares}
          costprice={holding.costprice}
        />
      ))}
    </Table.Body>

    {/*
    <Table.Footer>
    </Table.Footer>
    */}
  </Table>
);

Blotter.propTypes = {
  holdings: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  handleSelectAllHoldings: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  holdings: state.holdings.holdings,
  selected: state.holdings.selected
});

const mapDispatchToProps = dispatch => ({
  handleSelectAllHoldings() {
    dispatch(selectAllHoldings());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Blotter);