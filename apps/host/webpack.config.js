const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { getShared } = require('../mf-shared-deps');

const PORT = 3000;

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
  entry: './src/index.js',

  mode: argv.mode || 'development',

  devServer: {
    port: PORT,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
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
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      // Em producao precisa apontar para URLs reais dos remotes
      remotes: {
        header: 'header@http://localhost:3001/remoteEntry.js',      

        cards: 'cards@http://localhost:3002/remoteEntry.js',

        footer: 'footer@http://localhost:3003/remoteEntry.js',
      },

      shared: getShared({ eager: true }),
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
};