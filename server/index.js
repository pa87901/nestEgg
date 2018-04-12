'use strict'

require('babel-register'); // everything in this file itself will not be transpiled; but everything that it requires will be run through babel
const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
// const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
// const { StaticRouter } = require('react-router');
// const { Provider } = require('react-redux');
// const store = require('../client/src/store/configureStore');
const _ = require('lodash');
// const App = require('../client/src/containers/App.jsx').default; // .default because we export default; we export an {} with one key which is default
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackDevConfig = require('../webpack.config');
const db = require('../database-mongodb');
const HoldingsController = require('./controllers/holdingsMongo');
const TransactionsController = require('./controllers/transactionsMongo');
// const HoldingsController = require('./controllers/holdings');
// const TransactionsController = require('./controllers/transactions');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const webpackDevCompiler = webpack(webpackDevConfig);
app.use(webpackDevMiddleware(webpackDevCompiler));
app.use(webpackHotMiddleware(webpackDevCompiler));
app.use(express.static(`${__dirname}/../client/dist`));


app.use('/api/holdings', HoldingsController);
app.use('/api/transactions', TransactionsController);

app.use((req, res) => {
  // console.log('req.url', req.url);
  const context = {};
  // const body = renderToString(createElement(App));
  const body = renderToString(
    `<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>`
  );

  if (context.url) {
    res.redirect(context.url);
  }
  const baseTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Nest Egg Portfolio</title>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
      <div id="app"><%= body %></div> <!-- lodash templating for server-side rendering -->
      <script type="text/javascript" src="bundle.js"></script>
    </body>
    </html>
  `;
  const template = _.template(baseTemplate);
  res.write(template({body}));
  res.end();
});

app.use('*', (req, res) => {
  res.status(404).send();
});

app.listen(PORT, err => {
  // err ? console.error('Error with server') : console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
  if (err) {
    console.error('Error with server'); // eslint-disable-line no-console
  } else {
    console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
  }
});