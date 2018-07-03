const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const jsloader = (process.env.NODE_ENV === 'react-hot') ? 'react-hot-loader!babel-loader' : 'babel-loader';

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
];

const entry = {};
const mainEntryPoints = glob.sync(path.join(__dirname, './js/!(*.bundle).js'));
entry.main = mainEntryPoints;

const config = {
  context: __dirname,
  entry,
  output: {
    path: `${__dirname}/js`,
    filename: '[name].bundle.js',
    publicPath: 'js/',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsloader,
      },
    ],
  },
  plugins,
};

module.exports = config;
