 var webpack = require('webpack');
 var path = require('path');
 var bower_dir = path.join(__dirname, 'bower_components');
 var node_modules_dir = path.join(__dirname, 'node_modules');

 var config = {
   addVendor: function (name, path) {
     this.resolve.alias[name] = path;
     this.module.noParse.push(path);
   },
   context: __dirname,
   entry: {
     worker: './app/worker.js',
     app: ['webpack/hot/dev-server', './app/main.js']
   },
   output: {
     publicPath: '/',
     path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
     filename: 'bundle.js'
   },
   resolve: {
     alias: {}
   },
   module: {
     noParse: [],
     loaders: [
       { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
       { test: /\.css$/, loader: 'style-loader!css-loader' },
       { test: /\.(woff|png)$/, loader: 'url-loader?limit=100000'}
     ]
   },
   plugins: [
     new webpack.optimize.CommonsChunkPlugin('app', null, false),
     new webpack.optimize.CommonsChunkPlugin('worker', 'worker.js', false)
   ]
 };

 module.exports = config;
