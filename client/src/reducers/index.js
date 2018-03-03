import { combineReducers } from 'redux';
import holdings from './holdings';
import booking from './booking';

const rootReducer = combineReducers({
  holdings,
  booking
});

export default rootReducer;