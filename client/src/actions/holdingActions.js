export const ADD_BOOKING = 'ADD_BOOKING';
export const REMOVE_BOOKING = 'REMOVE_BOOKING';

export const addBooking = booking => ({
  type: ADD_BOOKING,
  payload: booking
});

export const removeBooking = bookingSymbol => ({
  type: REMOVE_BOOKING,
  payload: bookingSymbol
});