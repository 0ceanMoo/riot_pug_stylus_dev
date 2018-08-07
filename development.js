import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const ast = path.resolve(__dirname, 'assets')
const pub = path.resolve(__dirname, 'public')

export default {
  mode: 'development',
  entry: `${ast}/js/app.js`,

  output: {
    path: pub,
    filename: 'js/bundle.js'
  },

  module: {
    rules: [
      {
         test: /\.tag$/,
         enforce: 'pre',
         exclude: /node_modules/,
        use: [
          {
            loader: 'riot-tag-loader',
            options: {
              template: 'pug',
              debug: true
            }
          }
        ]
      },
      {
        test: /\.js(x)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.tag']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${ast}/html/index.html`,
      filename: 'index.html'                // output時はファイル名、サーバ時はURLのパスになる
    })
  ]
}
