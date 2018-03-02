export const SET_BOOKING_SYMBOL = 'SET_BOOKING_SYMBOL';
export const SET_BOOKING_TYPE = 'SET_BOOKING_TYPE';
export const SET_BOOKING_DATE = 'SET_BOOKING_DATE';
export const SET_BOOKING_SHARES = 'SET_BOOKING_SHARES';
export const SET_BOOKING_PRICE = 'SET_BOOKING_PRICE';

export const setBookingSymbol = symbol => ({
  type: SET_BOOKING_SYMBOL,
  payload: symbol
});

export const setBookingType = type => ({
  type: SET_BOOKING_TYPE,
  payload: type
});

export const setBookingDate = date => ({
  type: SET_BOOKING_DATE,
  payload: date
});

export const setBookingShares = shares => ({
  type: SET_BOOKING_SHARES,
  payload: shares
});

export const setBookingPrice = price => ({
  type: SET_BOOKING_PRICE,
  payload: price
});