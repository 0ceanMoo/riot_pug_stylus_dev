開発環境（Riot + Stylus + Pug）
====

Riot + Stylus + Pug を使った開発環境をさっと用意したいので作ってみた

* node 8.11.2
* webpack 4.16.3

```
git clone https://github.com/0ceanMoo/riot_pug_stylus_dev.git
yarn install
```

で、インストールが完了し

```
yarn server
```

で、サンプルページがlocalhost:8080に表示されるから
これをベースに開発していけばいいかなぁと

成果物が完成したら、

```
yarn build
```

で、静的なファイル吐くので、 それらのファイルをどこかサーバに置けばいい


環境構築メモ
----

以下は、環境構築の具体的な作業  
どうやって、環境を作ったかの備忘録として

### 下準備
```
yarn init -y
mkdir assets
mkdir assets/js
mkdir assets/js/tags
mkdir assets/html
mkdir public
mkdir public/js
```

### Riot
```
yarn add -D riot pug stylus
```

```
vi assets/html/index.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>Riot + Pug + Stylus</title>
  </head>
  <body>
    <h1>Index</h1>
    <app></app>
  </body>
</html>
```

```
vi assets/js/app.js
import riot from "riot"
import app from "./tags/app.tag"
riot.mount("*")
```

### Babel
yarn add -D babel-core babel-loader babel-preset-env babel-preset-es2015-riot

```
vi .babelrc
{
  "presets": [ "es2015-riot" ]
}
```

### Webpack
```
yarn add -D webpack webpack-cli html-webpack-plugin riot-tag-loader
yarn add -D webpack-dev-server
```

```
vi webpack.config.js
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
      filename: 'index.html'
    })
  ]
}
```

### 確認
```
yarn webpack
```

下記のファイルが生成されてれば成功

* public/index.html
* public/js/bundle.js


```
yarn webpack-dev-server
```

Webサーバが立ち上がり「localhost:8080」で閲覧できれば成功

package.jsonにエイリアスを作っておけば、
開発に選んだツール(react,vue,riot,sass,stylus,postcss,gulp,webpack)に関係なく、統一のインターフェイスで開発できるので便利

```
vi package.json
  "scripts": {
    "build": "webpack",
    "server": "webpack-dev-server"
  }
```

```
yarn build
yarn server
```
