import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

const renderApp = Component => {
  render(<Component />, document.getElementById('app'));
};
renderApp(App);


if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const App2 = require('./containers/App').default; // eslint-disable-line global-require
    renderApp(App2);
  });
}