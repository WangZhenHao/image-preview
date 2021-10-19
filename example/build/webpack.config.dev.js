const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const portfinder = require('portfinder');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resove(dir) {
  return path.join(__dirname, '..', './src', dir);
}

function multiplePage() {
  let entry = {},
    htmlWebpackPlugin = [];

  const pages = [
    {
      name: 'demo',
      template: 'demo/demo.html',
      entry: 'demo/demo.js'
    },
    {
      name: 'scale',
      template: 'scale/scale.html',
      entry: 'scale/scale.js'
    }
  ];

  pages.forEach((item, index) => {
    let name = item.name;
    entry[name] = resove(item.entry)
    let catalogue = item.template.split('/');
    catalogue.pop();
    
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        filename: path.join(
          __dirname,
          '..',
          `/dist/${catalogue.join('/')}.html`
        ),
        template: resove(item.template),
        title: '测试',
        // entry: name,
        //需要引入的js
        chunks: [name],
        minify: {
          removeComments: false,
          collapseWhitespace: false,
          removeAttributeQuotes: false,
          //压缩html中的js
          minifyJS: false,
          //压缩html中的css
          minifyCSS: false,
        },
        // chunksSortMode: 'dependency',
      })
    );
  })

  return {
    entry,
    htmlWebpackPlugin
  }
}

const pagesDetail = multiplePage()
// console.log(path.join(__dirname, '../../dist'), __dirname)
const devWebpackConfig = {
  resolve: {
    alias: {
      '@imagePreview': path.join(__dirname, '../../dist')
      // '@imagePreview': path.join(__dirname, '../../src')
    },
  },
  mode: 'development',
  entry: pagesDetail.entry,
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: false,
    historyApiFallback: false,
    hot: true,
    quiet: true,
    // 出现错误时，在浏览器中显示全屏覆盖层
    overlay: {
      warnings: false,
      errors: true,
    },
    host: '0.0.0.0',
    port: '8081',
  },
  module: {
    rules: [
      {
          test: /\.(c|sc)ss$/,
          use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    //启用热替换模块(Hot Module Replacement)，也被称为 HMR。
    new webpack.HotModuleReplacementPlugin(),
    ...pagesDetail.htmlWebpackPlugin
  ],
};

module.exports = new Promise((reslove, reject) => {
//   portfinder.basePort = config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
    } else {
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `您的应用运行成功: http://0.0.0.0:8081`,
            ],
          },
        })
      );
    }

    reslove(devWebpackConfig);
  });
});