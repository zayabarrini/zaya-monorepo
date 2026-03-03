const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    content: './src/content/index.js',
    background: './src/background/index.js',
    popup: './src/popup/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/firefox'),
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
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/icons', to: 'icons' },
        { from: 'src/lib', to: 'lib' },
        { from: 'src/popup/index.html', to: 'popup.html' },
        { from: 'src/styles.css', to: 'styles.css' },
        { from: 'manifest.firefox.json', to: 'manifest.json' },
      ],
    }),
  ],
};
