import {
  SET_HOLDINGS,
  SELECT_HOLDING,
  SELECT_ALL_HOLDINGS,
  REMOVE_BOOKINGS,
  ADD_HOLDING,
  UPDATE_HOLDINGS
} from '../actions/holdingActions';

export default function reducer(
  state = {
    holdings: [],
    selectedHoldings: []
  }, action) {
  switch (action.type) {
    case SET_HOLDINGS:
      return { ...state, holdings: action.payload };
    case SELECT_HOLDING: {
      const selectedIds = state.selectedHoldings.slice();
      const index = selectedIds.indexOf(action.payload);
      if (index < 0) {
        return { ...state, selectedHoldings: state.selectedHoldings.concat([action.payload]) };
      }
      selectedIds.splice(index, 1);
      return { ...state, selectedHoldings: selectedIds };
    }
    case SELECT_ALL_HOLDINGS: {
      if (state.holdings.length > state.selectedHoldings.length) {
        const symbols = [];
        state.holdings.forEach(holding => {
          symbols.push(holding.symbol);
        });
        return { ...state, selectedHoldings: symbols };
      }
      return { ...state, selectedHoldings: [] };
    }
    case REMOVE_BOOKINGS: {
      // Use this if MongoDB is being used
      const remainingHoldings = state.holdings.slice();
      const holdingsToDelete = action.payload;
      const symbols = remainingHoldings.map(holding => holding.symbol);
      holdingsToDelete.forEach(symbol => {
        const index = symbols.indexOf(symbol);
        remainingHoldings[index] = null;
      });
      const updatedHoldings = [];
      remainingHoldings.forEach(holding => {
        if (holding) {
          updatedHoldings.push(holding);
        }
      });
      return { ...state, holdings: updatedHoldings, selectedHoldings: [] }
      /* Use this if PSQL database is being used
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
      });
      return { ...state, holdings: updatedHoldings, selectedHoldings: []}
      */
    }
    case ADD_HOLDING: {
      console.log('Holding to add payload:', action.payload);
      const { price, symbol } = action.payload;
      const existingHoldings = state.holdings;
      let found = false;
      let foundHolding;
      // Iterate through state.holdings
      for (let i = 0; i < existingHoldings.length; i+=1) {
        // See if the symbol exists
        const holding = existingHoldings[i];
        if (holding.symbol === symbol) {
          found = true;
          foundHolding = holding;
          break;
        }
      }
      // CASE 1: symbol does NOT exist in holdings already, so add holding
      if (!found) {
        const newHolding = { ...action.payload, lastprice: price, currentprice: price, costprice: price };
        return { ...state, holdings: state.holdings.concat(newHolding)};
      }
      // CASE 2: symbol ALREADY exits in holdings, so update holding
      const { transactiontype, shares } = action.payload;
      const additionalShares = (transactiontype === 'Buy') ? shares : -shares;
      const totalShares = additionalShares + foundHolding.shares;
      const averageCostPrice = ((additionalShares * price) + (foundHolding.shares * foundHolding.costprice)) / totalShares;
      foundHolding.shares = totalShares;
      foundHolding.costprice = averageCostPrice;
      return { ...state, holdings: state.holdings.slice() };
    }
    case UPDATE_HOLDINGS: {
      // Iterate through the holdings array payload...
        // For each holding 
      return { ...state, holdings: action.payload }
    }
    default:
      return state;
  }
};