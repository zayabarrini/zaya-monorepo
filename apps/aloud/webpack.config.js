const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // Use development for easier debugging
  devtool: 'source-map',
  entry: {
    content: './src/content/index.js',
    background: './src/background/index.js',
    popup: './src/popup/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/chrome'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/icons', to: 'icons' },
        { from: 'src/lib/languagePatterns.js', to: 'lib/languagePatterns.js' },
        { from: 'src/popup/index.html', to: 'popup.html' },
        { from: 'src/styles.css', to: 'styles.css' },
        { from: 'manifest.json', to: 'manifest.json' },
      ],
    }),
  ],
};
