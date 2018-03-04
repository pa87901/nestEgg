import React, { Component } from 'react';
import { Modal, Button, Icon, Form, Dropdown } from 'semantic-ui-react';

const transaction = [
  { text: 'Buy', value: 'buy' },
  { text: 'Sell', value: 'sell' }
];

// const Ticket = () => (
//   <Modal
//     id="ticket"
//     trigger={
//       <Button basic color='black'>
//         <Icon name='book' />
//         Book trade
//       </Button>
//     }>
//     <Modal.Header>Trade ticket</Modal.Header>
//     <Modal.Content>
//       <Modal.Description>
//         <Form className="form">
//           <Form.Input
//             label='Add symbol'
//             placeholder='Symbol'
//             width={6} />
//           <Form.Field width={6} >
//             <label htmlFor='transactionType'>Transaction type</label>
//             <Dropdown
//               selection
//               placeholder='Transaction type'
//               options={transaction} />
//           </Form.Field>
//           <Form.Field width={6} >
//             <label htmlFor='date'>Date</label>
//             <input
//               id='date'
//               type='date' />
//           </Form.Field>
//           <Form.Input label='Shares' width={6} />
//           <Form.Input label='Price' width={6} />
//         </Form>
//       </Modal.Description>
//     </Modal.Content>
//   </Modal>
// );

class Ticket extends Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
      type: '',
      date: '',
      shares: 0,
      costPrice: 0
    };
    this.updateSymbol = this.updateSymbol.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateShares = this.updateShares.bind(this);
    this.updateCostPrice = this.updateCostPrice.bind(this);
    this.submitTicket = this.submitTicket.bind(this);
  }

  updateSymbol(event) {
    // console.log('symbol:', event.target.value);
    this.setState({ symbol: event.target.value });
  }

  updateType(event, { value }) {
    // console.log('type:', value);
    this.setState({ type: value });
  }

  updateDate(event) {
    // console.log('date:', event.target.value);
    this.setState({ date: event.target.value })
  }

  updateShares(event) {
    // console.log('shares:', event.target.value);
    if (isNaN(event.target.value)) { // eslint-disable-line no-restricted-globals
      window.alert('Enter a number');
    } else {
      this.setState({ shares: Number(event.target.value) });
    }
  }

  updateCostPrice(event) {
    // console.log('costPrice:', this.state.costPrice);
    this.setState({ costPrice: event.target.value });
  }

  submitTicket() {
    if (isNaN(this.state.costPrice)) { // eslint-disable-line no-restricted-globals
      window.alert('Cost price must be a valid number');
    }
    console.log('Ticket submitted:', this.state);
  }

  render() {
    return (
      <Modal
        id="ticket"
        trigger={
          <Button basic color='black'>
            <Icon name='book' />
            Book trade
          </Button>
        }>
        <Modal.Header>Trade ticket</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form className="form">
              <Form.Field
                control="input"
                value={this.state.symbol}
                label='Add symbol'
                placeholder='Symbol'
                onChange={this.updateSymbol}
                width={6} />
              <Form.Field
                width={6} >
                <label htmlFor='transactionType'>Transaction type</label>
                <Dropdown
                  selection
                  placeholder='Transaction type'
                  options={transaction}
                  value={this.state.type}
                  onChange={this.updateType}/>
              </Form.Field>
              <Form.Field width={6} >
                <label htmlFor='date'>Date</label>
                <input
                  id='date'
                  type='date'
                  placeholder={this.state.date}
                  onChange={this.updateDate} />
              </Form.Field>
              <Form.Input
                label='Shares'
                value={this.state.shares === 0 ? null : this.state.shares}
                onChange={this.updateShares}
                width={6} />
              <Form.Input
                label='Price'
                value={this.state.costPrice === 0 ? null : this.state.costPrice}
                onChange={this.updateCostPrice}
                width={6} />
              <Button
                basic
                onClick={this.submitTicket} >
                Submit ticket
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Ticket;