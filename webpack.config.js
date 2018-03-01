const path = require('path');
const SRC_DIR = path.resolve(__dirname, 'client/src');
const DIST_DIR = path.resolve(__dirname, 'client/dist');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: [
    'webpack-hot-middleware/client?',
    `${SRC_DIR}/index.jsx`
  ],
  devtool: 'inline-source-map',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true, // telling dev server if it doesn't recognise something send it down to the client, and let the client worry about the routing. 404s will fall back to /index.html
    inline: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'] // order of resolutions
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })
  ],
  // watch: true,
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000&minetype=image/png'
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      }
    ]
  }
};

if (process.env.NODE_ENV === 'staging') {
  config.entry = `${SRC_DIR}/index.jsx`;
  config.devtool = false;
  config.plugins = [];
}

module.exports = config;