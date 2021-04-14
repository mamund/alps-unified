const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'unified.js',
    libraryTarget: 'umd',
    library: 'lib',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  node: {
    fs: 'empty',
  }
};
