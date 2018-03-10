export const SET_HOLDINGS = 'SET_HOLDINGS';
export const ADD_BOOKING = 'ADD_BOOKING';
export const REMOVE_BOOKING = 'REMOVE_BOOKING';

export const setHoldings = holdings => ({
  type: SET_HOLDINGS,
  payload: holdings
});

export const addBooking = booking => ({
  type: ADD_BOOKING,
  payload: booking
});

export const removeBooking = bookingSymbol => ({
  type: REMOVE_BOOKING,
  payload: bookingSymbol
});