import React from 'react';
import { Table } from 'semantic-ui-react';
import Holding from './Holding';
import DummyData from './dummyHoldings';

const Blotter = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Last price</Table.HeaderCell>
        <Table.HeaderCell>Current price</Table.HeaderCell>
        <Table.HeaderCell>Change</Table.HeaderCell>
        <Table.HeaderCell>Shares</Table.HeaderCell>
        <Table.HeaderCell>Cost basis</Table.HeaderCell>
        <Table.HeaderCell>Mkt value</Table.HeaderCell>
        <Table.HeaderCell>Gain</Table.HeaderCell>
        <Table.HeaderCell>Gain %</Table.HeaderCell>
        <Table.HeaderCell>Day&#39;s gain</Table.HeaderCell>
        <Table.HeaderCell>Day &#39;s gain %</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Holding data={DummyData.holding1}/>
      <Holding data={DummyData.holding2}/>
      <Holding data={DummyData.holding3}/>
    </Table.Body>

    {/*
    <Table.Footer>
    </Table.Footer>
    */}
  </Table>
);

export default Blotter;