var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    list:'./example/list/index.js',
    autoComplete:'./example/auto-complete/index.js',
    page:'./example/page/index.js'
  },
  output: {
    path: path.resolve(__dirname, './asset'),
    publicPath: '/asset/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        enforce:'pre',
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules:['node_modules'],
    extensions: ['.js', '.json','.vue','.css','.scss'],
    alias: {
      'vue$': 'vue/dist/vue.min.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy:{
      '**': 'http://localhost:3000'
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
