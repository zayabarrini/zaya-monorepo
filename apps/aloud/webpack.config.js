const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtReloader = require('webpack-ext-reloader'); // Changed from @cedelabs/webpack-ext-reloader

module.exports = {
  mode: 'development',
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
    new ExtReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'content',
        background: 'background',
        extensionPage: 'popup',
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/icons', to: 'icons' },
        { from: 'src/lib/languagePatterns.js', to: 'lib/languagePatterns.js' },
        { from: 'src/lib/languagePatternsSyntax.js', to: 'lib/languagePatternsSyntax.js' },
        { from: 'src/popup/index.html', to: 'popup.html' },
        { from: 'src/styles.css', to: 'styles.css' },
        { from: 'src/styles/syntax-modal.css', to: 'styles/syntax-modal.css' },
        { from: 'manifest.json', to: 'manifest.json' },
      ],
    }),
  ],
};