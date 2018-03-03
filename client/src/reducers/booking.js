import {
  SET_BOOKING_SYMBOL,
  SET_BOOKING_TYPE,
  SET_BOOKING_DATE,
  SET_BOOKING_SHARES,
  SET_BOOKING_PRICE
} from '../actions/bookingActions';

export default function reducer(
  state = {
    symbol: '',
    type: '',
    date: '',
    shares: 0,
    price: 0
  }, action) {
  switch (action.type) {
    case SET_BOOKING_SYMBOL:
      return { ...state, symbol: action.payload };
    case SET_BOOKING_TYPE:
      return { ...state, symbol: action.payload };
    case SET_BOOKING_DATE:
      return { ...state, symbol: action.payload };
    case SET_BOOKING_SHARES:
      return { ...state, symbol: action.payload };
    case SET_BOOKING_PRICE:
      return { ...state, symbol: action.payload };
    default:
      return state;
  }
};