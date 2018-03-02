import React from 'react';
import { Modal, Button, Header, Icon, Form, Dropdown } from 'semantic-ui-react';

const transaction = [
  { text: 'Buy', value: 'buy' },
  { text: 'Sell', value: 'sell' }
];

const Ticket = () => (
  <Modal trigger={<Button basic color='black'><Icon name='book' /> Book trade</Button>}>
    <Modal.Header>
      Trade ticket
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Ticket form will go here</Header>
        <Form>
          <Form.Input
            label='Add symbol'
            placeholder='Symbol'
            width={6} />
          <Form.Field width={6}>
            <label htmlFor='transactionType'>Transaction type</label>
            <Dropdown
              selection
              placeholder='Transaction type'
              options={transaction} />
          </Form.Field>
          <Form.Field width={6}>
            <label htmlFor='date'>Date</label>
            <input
              id='date'
              type='date' />
          </Form.Field>
          <Form.Input label='Shares' width={6} />
          <Form.Input label='Price' width={6} />
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default Ticket;