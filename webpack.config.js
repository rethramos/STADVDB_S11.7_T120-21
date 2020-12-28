const path = require('path');

module.exports = {
  entry: {
    'districts-unemployment-rate': `./src/js/pages/districts-unemployment-rate.js`,
    'districts-salary': `./src/js/pages/districts-salary.js`,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'commons',
      chunks: 'all',
    },
  },
};
