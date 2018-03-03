import React from 'react';
import { Provider } from 'react-redux';
// import PropTypes from 'prop-types';
import store from '../store/configureStore';
import Portfolio from './Portfolio';

const App = () => (
  <div>
    <h1>Nest Egg World</h1>
    <div className="blotter-container">
      <Provider store={store} >
        <Portfolio />
      </Provider>
    </div>
  </div>
);

// App.propTypes = {
//   store: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
// }

export default App;