import {
  SET_HOLDINGS,
  ADD_BOOKING,
  // REMOVE_BOOKING
} from '../actions/holdingActions';
// import DummyData from './dummyHoldings';

export default function reducer(
  state = {
    holdings: [
      // DummyData.holding1,
      // DummyData.holding2,
      // DummyData.holding3
    ]
  }, action) {
  switch (action.type) {
    case SET_HOLDINGS:
      return { ...state, holdings: action.payload }
    case ADD_BOOKING:  // eslint-disable-line no-case-declarations
      return { ...state, holdings: state.holdings.concat([action.payload]) };
    default:
      return state;
  }
};