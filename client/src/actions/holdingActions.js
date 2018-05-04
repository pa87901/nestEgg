export const SET_HOLDINGS = 'SET_HOLDINGS';
export const SELECT_HOLDING = 'SELECT_HOLDING';
export const SELECT_ALL_HOLDINGS = 'SELECT_ALL_HOLDINGS';
export const REMOVE_BOOKINGS = 'REMOVE_BOOKINGS';
export const ADD_HOLDING = 'ADD_HOLDING';
export const UPDATE_HOLDINGS = 'UPDATE_HOLDINGS';

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

export const addHolding = holding => ({
  type: ADD_HOLDING,
  payload: holding
});

export const updateHoldings = holdings => ({
  type: UPDATE_HOLDINGS,
  payload: holdings
});