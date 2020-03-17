const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

dotenv.config()
const {APP, PORT, AUTHORIZATION_KEY } = process.env

const processEnv = new webpack.DefinePlugin({
  'process.env': {
    // BUILD_VERSION: JSON.stringify(getRepoInfo()),
    APP: JSON.stringify(APP || 'development'),
    PORT: JSON.stringify(PORT),
    AUTHORIZATION_KEY: JSON.stringify(AUTHORIZATION_KEY)
  },
});

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  entry: './src/web/index.tsx',
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

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins: [
    processEnv,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/web/index.html',
      // favicon: ''
    })
  ]
};