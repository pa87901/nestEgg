import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import Portfolio from './Portfolio';

const App = () => (
  <Provider store={store} >
    <Portfolio />
  </Provider>
);

export default App;