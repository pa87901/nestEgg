const path = require('path');
const SRC_DIR = path.resolve(__dirname, 'client/src');
const DIST_DIR = path.resolve(__dirname, 'client/dist');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  // context: __dirname,
  entry: [
    // 'react-hot-loader/patch', // for hot module replacement
    // 'webpack-dev-server/client?http://localhost:3000', //for hot module replacement
    // 'webpack/hot/dev-server', // for hot module replacement
    'webpack-hot-middleware/client?path=__webpack_hmr&timeout=2000', // to fix hot module reload after introducing server-side rendering
    // 'webpack-hot-middleware/client',
    `${SRC_DIR}/index.jsx`
  ],
  devtool: 'inline-source-map',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    // hotUpdateChunkFilename: 'hot/hot-update.js',
    // hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devServer: {
    // host: 'localhost',
    // port: 3000,
    hot: true,
    publicPath: '/',
    historyApiFallback: true, // telling dev server if it doesn't recognise something send it down to the client, and let the client worry about the routing. 404s will fall back to /index.html
    // inline: true,
    // contentBase: DIST_DIR
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
        // query: {
        //   presets: ['react', 'es2015'] // these presets can be included in the .babelrc file instead. If included here, no need for .babelrc file.
        // }
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