const path = require('path')

const srcPath = path.resolve(__dirname, '../')

module.exports = {
  entry: path.join(srcPath, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(srcPath, '../static/js')
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }]
  }
}
