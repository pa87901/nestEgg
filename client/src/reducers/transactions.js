import {
  SET_TRANSACTIONS,
  ADD_BOOKING,
  SELECT_TRANSACTION
} from '../actions/transactionActions';

export default function reducer(
  state = {
    transactions: [],
    selectedTransactions: []
  }, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    case ADD_BOOKING:
      return { ...state, transactions: state.transactions.concat([action.payload]) };
    case SELECT_TRANSACTION: {
      const selectedIds = state.selectedTransactions.slice();
      const index = selectedIds.indexOf(action.payload);
      if (index < 0) {
        return { ...state, selectedTransactions: state.selectedTransactions.concat([action.payload]) };
      }
      selectedIds.splice(index, 1);
      return { ...state, selectedTransactions: selectedIds };
    }
    default:
      return state;
  }
};