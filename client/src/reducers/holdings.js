import {
  SET_HOLDINGS,
  SELECT_HOLDING,
  SELECT_ALL_HOLDINGS,
  REMOVE_BOOKINGS
  // ADD_BOOKING,
} from '../actions/holdingActions';

export default function reducer(
  state = {
    holdings: [],
    selected: []
  }, action) {
  switch (action.type) {
    case SET_HOLDINGS:
      return { ...state, holdings: action.payload };
    // case ADD_BOOKING:  // eslint-disable-line no-case-declarations
    //   return { ...state, holdings: state.holdings.concat([action.payload]) };
    case SELECT_HOLDING: {
      const selectedIds = state.selected.slice();
      const index = selectedIds.indexOf(action.payload);
      if (index < 0) {
        return { ...state, selected: state.selected.concat([action.payload]) };
      }
      selectedIds.splice(index, 1);
      return { ...state, selected: selectedIds };
    }
    case SELECT_ALL_HOLDINGS: {
      if (state.holdings.length > state.selected.length) {
        const ids = [];
        state.holdings.forEach(holding => {
          ids.push(holding.id);
        });
        return { ...state, selected: ids };
      }
      return { ...state, selected: [] };
    }
    case REMOVE_BOOKINGS: {
      const remainingHoldings = state.holdings.slice();
      const holdingsToDelete = action.payload;
      const idsToDelete = holdingsToDelete.map(holding => holding.id);
      const ids = remainingHoldings.map(holding => holding.id);
      idsToDelete.forEach(id => {
        const index = ids.indexOf(id);
        remainingHoldings[index] = null;
      });
      const updatedHoldings = [];
      remainingHoldings.forEach(holding => {
        if (holding) {
          updatedHoldings.push(holding);
        }
      })
      return { ...state, holdings: updatedHoldings, selected: []}
    }
    default:
      return state;
  }
};