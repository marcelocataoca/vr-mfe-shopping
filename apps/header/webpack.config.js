const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { getShared } = require('../mf-shared-deps');

const PORT = 3001;

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
  entry: './src/index.js',

  mode: argv.mode || 'development',

  devServer: {
    port: PORT,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',

      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },

  output: {
    publicPath: isDev ? `http://localhost:${PORT}/` : 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: !isDev,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash][ext]',
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'header',

      filename: 'remoteEntry.js',

      exposes: {
        './Header': './src/App.jsx',
      },

      shared: getShared(),
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
};