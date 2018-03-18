export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
export const ADD_BOOKING = 'ADD_BOOKING';

export const setTransactions = transactions => ({
  type: SET_TRANSACTIONS,
  payload: transactions
});

export const addBooking = booking => ({
  type: ADD_BOOKING,
  payload: booking
});