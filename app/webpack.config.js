const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const   plugins = [
  new HtmlWebpackPlugin({filename:'index.html', template: 'index.html'}),
  new CopyWebpackPlugin([ {from: 'app.yaml', to: 'app.yaml'} ]),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({APP_ROOT : "'/'"}),
  new webpack.DefinePlugin({API_ENDPOINT : /*process.env.NODE_ENV === 'production'*/ true ? "'https://dcoin-backend.appspot.com/'" : "'http://localhost:3001/'"}),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '\'' + process.env.NODE_ENV + '\'',
    },
  }),
];

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'frontend'),
    publicPath : '/',
    filename: 'assets/js/bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ]
      },
      {
        test: /\.(png|gif|jpg|ico)$/,
        exclude: /node_modules/,
        use : ['file-loader?name=[name].[ext]&outputPath=assets/images/'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json$/,
        include: '/build/contracts/EcoAllyBase.json',
        use : ['json-loader']
        
      },
      { 
        test: /.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?publicPath=/&name=fonts/[name].[ext]&outputPath=assets/fonts/'
      },
    ],
  },
  plugins,
  resolve: {
    alias: {
        '~' : path.resolve( __dirname, 'src' )
    },
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};