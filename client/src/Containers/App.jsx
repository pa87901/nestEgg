import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from '../store/configureStore';
import history from '../store/history';
import Portfolio from './Portfolio';
import Clipboard from './Clipboard';

const FourOhFour = () => <h1>404</h1>
// console.log('store', store, 'history', history);

const App = () => (
  <Provider store={store} >
    <div>
      <h1>Nest Egg World</h1>
      <div className="blotter-container">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Portfolio}/>
          <Route path="/transactions" component={Clipboard} />
          <Route component={FourOhFour}/>
        </Switch>
      </Router>
      </div>
    </div>
  </Provider>
);

export default App;