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
    const { handleSubmitTicket } = this.props;
    if (isNaN(this.state.costPrice)) { // eslint-disable-line no-restricted-globals
      window.alert('Cost price must be a valid number');
    } else {
      this.setState({ costPrice: Number(this.state.costPrice) });
      // Add these keys as they are not part of the component state. The completed object will be sent to the holdings reducer.
      const newTicket = {
        symbol: this.state.symbol,
        type: this.state.type,
        date: this.state.date,
        shares: this.state.shares,
        costPrice: this.state.costPrice
      }
      newTicket.name = 'Dummy name';
      newTicket.lastPrice = this.state.costPrice;
      newTicket.currentPrice = this.state.costPrice;
      handleSubmitTicket(newTicket);
      this.setState({
        symbol: '',
        type: '',
        date: '',
        shares: 0,
        costPrice: 0,
        modalOpen: false
      });
    }
  }

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  modalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { symbol, type, shares, costPrice } = this.state;
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
                    onChange={this.updateDate} />
                </Form.Field>
                <Form.Input
                  label='Shares'
                  value={shares === 0 ? undefined : shares}
                  placeholder='0'
                  onChange={this.updateShares}
                  width={6} />
                <Form.Input
                  label='Price'
                  value={costPrice === 0 ? undefined : costPrice}
                  placeholder='0'
                  onChange={this.updateCostPrice}
                  width={6} />
                <Button
                  basic
                  onClick={this.submitTicket}
                  type="button">
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