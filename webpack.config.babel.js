const webpack2 = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postCssClassPrefix = require('postcss-class-prefix');

const paths = require('./configs/paths');
const NODE_ENV = process.env.NODE_ENV.trim();
const isDevelopment = NODE_ENV === 'development';

module.exports = {
  entry: {
    'ca-debug': "./src/js/index.js",
    'engage': "./src/js/modules/engage/engage-module.js"
  },
  output: {
    publicPath: './',
    filename: '[name].js'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        enforce: 'pre',
        loaders: ['eslint-loader']
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|dist)/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.ts?$/,
        exclude: /(node_modules|dist)/,
        loaders: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.pug$/,
        use: ['pug-loader?pretty=true']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  },
  watch: isDevelopment,
  watchOptions: {
    aggregateTimeout: 300
  },
  plugins: [
    new webpack2.NoEmitOnErrorsPlugin(),
    new webpack2.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      VERSION: JSON.stringify(require("./package.json").version)
    }),
    new webpack2.LoaderOptionsPlugin({
      minimize: !isDevelopment,
      debug: false,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version', 'Explorer >= 8']
          }),
          postCssClassPrefix('ce-')
        ],
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, 'node_modules/sanitize.css/')
          ]
        }
      }
    }),
    new webpack2.ProvidePlugin({
      '_': 'underscore'
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.scss']
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js'],
    moduleExtensions: ['-loader']
  }
};

if (!isDevelopment) {
  module.exports.entry['ca']  = './src/js/index.js';
  module.exports.entry['es5-shim'] = 'aight/aight.min';
}