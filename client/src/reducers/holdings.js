import {
  SET_HOLDINGS,
  ADD_BOOKING,
  SELECT_HOLDING,
  SELECT_ALL_HOLDINGS
  // REMOVE_BOOKING
} from '../actions/holdingActions';

export default function reducer(
  state = {
    holdings: [],
    selected: []
  }, action) {
  switch (action.type) {
    case SET_HOLDINGS:
      return { ...state, holdings: action.payload };
    case ADD_BOOKING:  // eslint-disable-line no-case-declarations
      return { ...state, holdings: state.holdings.concat([action.payload]) };
    case SELECT_HOLDING: {
      const selectedIds = state.selected;
      const index = selectedIds.indexOf(action.payload);
      if (index < 0) {
        return { ...state, selected: state.selected.concat([action.payload]) };
      }
      selectedIds.splice(index, 1);
      const selected2 = selectedIds.slice();
      return { ...state, selected: selected2 };
    }
    case SELECT_ALL_HOLDINGS: {
      // Traverse the holdings [] to get all the ids
      if (state.holdings.length > state.selected.length) {
        const ids = [];
        state.holdings.forEach(holding => {
          ids.push(holding.id);
        });
        return { ...state, selected: ids };
      }
      // Deselect all holdings
      return { ...state, selected: [] };
    }
    default:
      return state;
  }
};