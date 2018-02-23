// 'use strict'
require('babel-register'); // everything in this file itself will not be transpiled; but everything that it requires will be run through babel
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');
const React = require('react');
const { renderToString } = require('react-dom/server');
const _ = require('lodash');
const fs = require('fs');
const App = require('../client/src/containers/App.jsx').default; // .default because we export default; we export an {} with one key which is default
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackDevConfig = require('../webpack.config');
// const html = require('../client/dist/index.html');

// const baseTemplate = fs.readFileSync(html); // readFileSync is going to read index.html and will pause until it finishes reading. It will only be read once when you start up your server.
// const template = _.template(baseTemplate) // template is a function that when invoked takes in body and gives back our markup inside index.html


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const webpackDevCompiler = webpack(webpackDevConfig);
app.use(
  webpackDevMiddleware(webpackDevCompiler, {
    // publicPath: webpackDevConfig.output.publicPath
  })
);
app.use(webpackHotMiddleware(webpackDevCompiler, {
  log: () => {},
  heartbeat: 2000
}));
// const baseTemplate = fs.readFileSync('../client/dist/index.html');
// const filename = path.join(webpackDevCompiler.outputPath)
app.use(express.static(`${__dirname}/../client/dist`));


app.use((req, res) => {
  console.log('req.url', req.url);
  const context = {};
  const body = ReactDOMServer.renderToString(React.createElement(App));
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
  `
  const template = _.template(baseTemplate)

  res.write(template({body}));
  res.end();
})


app.use('*', (req, res) => {
  res.status(404).send();
});

app.listen(PORT, err => {
  err ? console.error('Error with server') : console.log(`Listening on port ${PORT}`);
});
/*
var express = require('express');
var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(require('../webpack.dev.config'));

function createWebpackDevMiddleware() {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: compiler.publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

function addWebpackHotMiddleWare(app, middleware){
  app.use(webpackHotMiddleware(compiler));
  // const filename = path.join(compiler.outputPath, "index.html");
  const filename = '../client/dist/index.html';

  app.get('*', (req, res) => {
    console.log(filename);
    middleware.fileSystem.readFile(filename, (err, file) => {
      if (err) {
        console.log('BAD', err);
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
}

function addMiddleware(app) {

  const middleware = createWebpackDevMiddleware();
  app.use(middleware);
  addWebpackHotMiddleWare(app, middleware)
};

var app = express();
app.use(require("webpack-hot-middleware")(compiler));

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

addMiddleware(app);

app.listen(PORT, err => {
  err ? console.error('Error with server') : console.log(`Listening on port ${PORT}`);
});
*/