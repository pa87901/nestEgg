export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
export const ADD_BOOKING = 'ADD_BOOKING';
export const SELECT_TRANSACTION = 'SELECT_TRANSACTION';
export const SELECT_ALL_TRANSACTIONS = 'SELECT_ALL_TRANSACTIONS';

export const setTransactions = transactions => ({
  type: SET_TRANSACTIONS,
  payload: transactions
});

export const addBooking = booking => ({
  type: ADD_BOOKING,
  payload: booking
});

export const selectTransaction = id => ({
  type: SELECT_TRANSACTION,
  payload: id
});

export const selectAllTransactions = () => ({
  type: SELECT_ALL_TRANSACTIONS
});