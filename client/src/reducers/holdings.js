import {
  SET_HOLDINGS,
  ADD_BOOKING,
  SELECT_HOLDING,
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
      // Check if the selected state [] already contains the payload id
      const selectedIds = state.selected;
      const index = selectedIds.indexOf(action.payload);
      // If no
      if (index < 0) {
        // Add to the selected []
        return { ...state, selected: state.selected.concat([action.payload]) };
      }
      // If yes
      // Remove from the selected []
      selectedIds.splice(index, 1);
      return { ...state, selected: selectedIds };
    }
      // return { ...state, selected: state.selected.concat([action.payload]) };
    default:
      return state;
  }
};