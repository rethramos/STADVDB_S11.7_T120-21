const path = require('path');

module.exports = {
  entry: {
    'districts-unemployment-rate': `./src/js/pages/districts-unemployment-rate.js`,
    'districts-salary': `./src/js/pages/districts-salary.js`,
    'districts-committed-crimes': `./src/js/pages/districts-committed-crimes.js`,
    'accounts-contract-status': `./src/js/pages/accounts-contract-status.js`,
    'accounts-account-district': `./src/js/pages/accounts-account-district.js`,
    'loans-loan-count': `./src/js/pages/loans-loan-count.js`,
    'transactions-region-transactions': `./src/js/pages/transactions-region-transactions`,
    'cards-issuance': `./src/js/pages/cards-issuance.js`,
    'analytics-date-rollup': `./src/js/pages/analytics-date-rollup.js`,
    'analytics-slice': `./src/js/pages/analytics-slice.js`,
    'analytics-dice': `./src/js/pages/analytics-dice.js`,
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
