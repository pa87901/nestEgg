import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from '../store/configureStore';
import history from '../store/history';
import Portfolio from './Portfolio';

const FourOhFour = () => <h1>404</h1>
console.log('store', store, 'history', history);
// console.log('store', store);
const App = () => (
  <Provider store={store} >
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Portfolio}/>
        <Route component={FourOhFour}/>
      </Switch>
    </Router>
  </Provider>
);

export default App;