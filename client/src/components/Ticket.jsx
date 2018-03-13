import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form, Dropdown } from 'semantic-ui-react';
import { addBooking } from '../actions/holdingActions';

const transaction = [
  { text: 'Buy', value: 'buy' },
  { text: 'Sell', value: 'sell' }
];


class Ticket extends Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
      type: '',
      date: '',
      shares: 0,
      costPrice: 0,
      modalOpen: false
    };
    this.updateSymbol = this.updateSymbol.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateShares = this.updateShares.bind(this);
    this.updateCostPrice = this.updateCostPrice.bind(this);
    this.submitTicket = this.submitTicket.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  updateSymbol(event) {
    this.setState({ symbol: event.target.value });
  }

  updateType(event, { value }) {
    this.setState({ type: value });
  }

  updateDate(event) {
    this.setState({ date: event.target.value })
  }

  updateShares(event) {
    if (isNaN(event.target.value)) { // eslint-disable-line no-restricted-globals
      window.alert('Enter a number');
    } else {
      this.setState({ shares: Number(event.target.value) });
    }
  }

  updateCostPrice(event) {
    this.setState({ costPrice: Number(event.target.value) });
  }

  submitTicket() {
    const { symbol, type, date, shares, costPrice } = this.state;
    const { handleSubmitTicket } = this.props;
    const payload = {
      symbol,
      type,
      date,
      shares,
      costPrice
    };
    const headers = {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json'
    };
    const init = {
      method: 'POST',
      headers,
      mode: 'cors',
      body: JSON.stringify(payload),
      json: true
    };
    fetch('/api/holdings/', init)
    .then(res => res.json())
    .then(resJSON => {
      handleSubmitTicket(resJSON);
    })
    .catch(err => {
      console.error('Cound not add trade to the backend:', err); // eslint-disable-line no-console
    });
    this.setState({ modalOpen: false });
  }

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  modalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { symbol, type, date, shares, costPrice } = this.state;
    return (
      <div>
        <Modal
          id="ticket"
          trigger={
            <Button
              basic
              color='black'
              onClick={this.modalOpen}
              >
              <Icon name='book' />
              Book trade
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.modalClose}
          closeIcon>
          <Modal.Header>Trade ticket</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form className="form">
                <Form.Field
                  control="input"
                  value={symbol}
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
                    value={type}
                    onChange={this.updateType}/>
                </Form.Field>
                <Form.Field width={6} >
                  <label htmlFor='date'>Date</label>
                  <input
                    id='date'
                    type='date'
                    value={date}
                    onChange={this.updateDate} />
                </Form.Field>
                <Form.Input
                  label='Shares'
                  value={shares === 0 ? '' : shares}
                  placeholder='0'
                  onChange={this.updateShares}
                  width={6} />
                <Form.Input
                  label='Price'
                  value={costPrice === 0 ? '' : costPrice}
                  placeholder='0'
                  onChange={this.updateCostPrice}
                  width={6} />
                <Button
                  basic
                  onClick={this.submitTicket}
                  type='button'>
                  Submit ticket
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}


Ticket.propTypes = {
  handleSubmitTicket: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleSubmitTicket(ticket) {
    dispatch(addBooking(ticket));
  }
});

export default connect(null, mapDispatchToProps)(Ticket);