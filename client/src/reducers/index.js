import { combineReducers } from 'redux';
import holdings from './holdings';
import booking from './booking';
import transactions from './transactions';

const rootReducer = combineReducers({
  holdings,
  booking,
  transactions
});

export default rootReducer;