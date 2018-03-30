import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';
import history from './history';

const logger = createLogger();

// const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger, historyMiddleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

export default store;