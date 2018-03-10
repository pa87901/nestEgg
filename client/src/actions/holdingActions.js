export const SET_HOLDINGS = 'SET_HOLDINGS';
export const ADD_BOOKING = 'ADD_BOOKING';
export const SELECT_HOLDING = 'SELECT_HOLDING';
export const DESELECT_HOLDING = 'DESELECT_HOLDING';
export const REMOVE_BOOKING = 'REMOVE_BOOKING';

export const setHoldings = holdings => ({
  type: SET_HOLDINGS,
  payload: holdings
});

export const addBooking = booking => ({
  type: ADD_BOOKING,
  payload: booking
});

export const selectHolding = id => ({
  type: SELECT_HOLDING,
  payload: id
});

export const deselectHolding = id => ({
  type: DESELECT_HOLDING,
  payload: id
});

export const removeBooking = bookingSymbol => ({
  type: REMOVE_BOOKING,
  payload: bookingSymbol
});