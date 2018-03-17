export const SET_HOLDINGS = 'SET_HOLDINGS';
export const SELECT_HOLDING = 'SELECT_HOLDING';
export const SELECT_ALL_HOLDINGS = 'SELECT_ALL_HOLDINGS';
export const REMOVE_BOOKINGS = 'REMOVE_BOOKINGS';

export const setHoldings = holdings => ({
  type: SET_HOLDINGS,
  payload: holdings
});

export const selectHolding = id => ({
  type: SELECT_HOLDING,
  payload: id
});

export const selectAllHoldings = () => ({
  type: SELECT_ALL_HOLDINGS
});

export const removeBookings = holdings => ({
  type: REMOVE_BOOKINGS,
  payload: holdings
});