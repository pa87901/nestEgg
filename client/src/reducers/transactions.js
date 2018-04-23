import {
  SET_TRANSACTIONS,
  ADD_BOOKING,
  SELECT_TRANSACTION,
  SELECT_ALL_TRANSACTIONS
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
    case SELECT_ALL_TRANSACTIONS: {
      if (state.transactions.length > state.selectedTransactions.length) {
        const ids = [];
        state.transactions.forEach(transaction => {
          ids.push(transaction._id); // eslint-disable-line no-underscore-dangle
        });
        return { ...state, selectedTransactions: ids };
      }
      return { ...state, selectedTransactions: [] };
    }
    default:
      return state;
  }
};