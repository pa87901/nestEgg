import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../store/configureStore';
import history from '../store/history';
import Portfolio from './Portfolio';

const FourOhFour = () => <h1>404</h1>
console.log('store', store, 'history', history);
// console.log('store', store);
const App = () => (
  <Provider store={store} >
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={Portfolio}/>
        <Route path="/a" component={FourOhFour}/>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;