const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getRepoInfo = require('git-repo-info')

dotenv.config()
const {
  APP = 'development',
  PORT = 3001,
  AUTHORIZATION_KEY
} = process.env

const processEnv = new webpack.DefinePlugin({
  'process.env': {
    BUILD_VERSION: JSON.stringify(getRepoInfo()),
    APP: JSON.stringify(APP),
    PORT: JSON.stringify(APP === 'development' ? 3000 : PORT),
    AUTHORIZATION_KEY: JSON.stringify(AUTHORIZATION_KEY),
    SERVER_BASE_URL: JSON.stringify(APP === 'development' ? `http://localhost:${PORT}` : '')
  },
});

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  entry: './web/index.tsx',
  output: {
    path: path.join(__dirname, 'dist/web'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg|jpg|png|gif|ico)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    processEnv,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './web/index.html',
      // favicon: './web/shared/assets/images/logo.png'
    })
  ]
};