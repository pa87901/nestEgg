import {
  SET_TRANSACTIONS,
  ADD_BOOKING
} from '../actions/transactionActions';

export default function reducer(
  state = {
    transactions: []
  }, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    case ADD_BOOKING:
      return { ...state, transactions: state.transactions.concat([action.payload]) };
    default:
      return state;
  }
};