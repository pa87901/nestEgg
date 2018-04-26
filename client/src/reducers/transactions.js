import {
  SET_TRANSACTIONS,
  ADD_BOOKING,
  SELECT_TRANSACTION,
  SELECT_ALL_TRANSACTIONS,
  REMOVE_TRANSACTIONS
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
    case REMOVE_TRANSACTIONS: {
      const remainingTransactions = state.transactions.slice();
      const transactionsToDelete = action.payload;
      const ids = remainingTransactions.map(transaction => transaction._id); // eslint-disable-line no-underscore-dangle
      transactionsToDelete.forEach(id => {
        const index = ids.indexOf(id);
        remainingTransactions[index] = null;
      });
      const updatedTransactions = [];
      remainingTransactions.forEach(transaction => {
        if (transaction) {
          updatedTransactions.push(transaction);
        }
      });
      return { ...state, transactions: updatedTransactions, selectedTransactions: [] }
    }
    default:
      return state;
  }
};