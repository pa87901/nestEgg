import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from '../store/configureStore';
import history from '../store/history';
import Navigation from '../components/Navigation';
import Portfolio from './Portfolio';
import Clipboard from './Clipboard';

const Oopsie = () => <h1>Oops! Unrecognised url, please try again.</h1>
// console.log('store', store, 'history', history);

const App = () => (
  <Provider store={store} >
    <div>
      <h1>Nest Egg World</h1>
      <div className="blotter-container">
      <Router history={history}>
        <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Portfolio} />
          <Route path="/holdings" component={Portfolio} />
          <Route path="/transactions" component={Clipboard} />
          <Route component={Oopsie}/>
        </Switch>
        </div>
      </Router>
      </div>
    </div>
  </Provider>
);

export default App;